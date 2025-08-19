from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
import re

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Blog Models
class BlogPost(BaseModel):
    id: str
    title: str
    excerpt: str
    content: str
    reading_time: str
    publish_date: str
    image_url: Optional[str] = None
    tags: List[str] = []

class BlogSummary(BaseModel):
    id: str
    title: str
    excerpt: str
    reading_time: str
    publish_date: str
    image_url: Optional[str] = None
    tags: List[str] = []

# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

def read_blog_files():
    """Read all blog markdown files and convert to structured data"""
    blog_dir = Path(__file__).parent.parent  # /app directory
    
    blogs_data = [
        {
            "id": "farm-fresh-benefits",
            "title": "Why Farm Fresh Milk from New York Makes All the Difference: A Local Dairy's Perspective",
            "excerpt": "Discover the remarkable differences in taste, nutrition, and quality that come from choosing farm-fresh milk produced right here in New York State.",
            "reading_time": "8 min read",
            "publish_date": "March 15, 2024",
            "image_url": "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&h=600&fit=crop",
            "tags": ["Farm Fresh", "Nutrition", "Local Dairy", "Health Benefits"],
            "filename": "blog_1_farm_fresh_benefits.md"
        },
        {
            "id": "sustainable-farming",
            "title": "Sustainable Dairy Farming in New York: How We're Protecting Tomorrow's Pastures Today",
            "excerpt": "Learn how modern New York dairy farmers are leading the charge in agricultural sustainability through regenerative practices that benefit both the environment and our communities.",
            "reading_time": "9 min read", 
            "publish_date": "March 12, 2024",
            "image_url": "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&h=600&fit=crop",
            "tags": ["Sustainability", "Environment", "Regenerative Agriculture", "Climate"],
            "filename": "blog_2_sustainable_farming.md"
        },
        {
            "id": "artisan-cheese-making",
            "title": "The Art of New York Artisan Cheese: From Traditional Techniques to Modern Innovation",
            "excerpt": "Explore the rich heritage and exciting renaissance of artisan cheese making in New York State, where traditional techniques meet modern innovation.",
            "reading_time": "10 min read",
            "publish_date": "March 10, 2024", 
            "image_url": "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800&h=600&fit=crop",
            "tags": ["Artisan Cheese", "Craftsmanship", "Tradition", "Innovation"],
            "filename": "blog_3_artisan_cheese_making.md"
        },
        {
            "id": "local-dairy-health-benefits",
            "title": "The Hidden Health Benefits of Local Dairy: What Science Reveals About New York Farm-Fresh Products",
            "excerpt": "Discover the scientifically-proven health advantages of consuming fresh, local dairy products from grass-fed cows in New York State.",
            "reading_time": "9 min read",
            "publish_date": "March 8, 2024",
            "image_url": "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&h=600&fit=crop",
            "tags": ["Health Benefits", "Nutrition Science", "Grass-Fed", "Wellness"],
            "filename": "blog_4_local_dairy_health_benefits.md"
        },
        {
            "id": "seasonal-dairy-recipes",
            "title": "Seasonal Dairy Delights: Farm-Fresh Recipes That Celebrate New York's Harvest Calendar",
            "excerpt": "Discover delicious recipes that pair New York's seasonal bounty with fresh dairy products, celebrating the natural rhythms of farm life throughout the year.",
            "reading_time": "11 min read",
            "publish_date": "March 5, 2024",
            "image_url": "https://images.unsplash.com/photo-1549221987-b352cac6d5b4?w=800&h=600&fit=crop",
            "tags": ["Recipes", "Seasonal Cooking", "Farm to Table", "Comfort Food"],
            "filename": "blog_5_seasonal_dairy_recipes.md"
        }
    ]
    
    # Read the actual content from markdown files
    for blog in blogs_data:
        try:
            file_path = blog_dir / blog["filename"]
            if file_path.exists():
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    # Remove the first line (title) and convert to HTML-friendly format
                    lines = content.split('\n')[1:]  # Skip the first markdown title line
                    blog["content"] = '\n'.join(lines)
            else:
                blog["content"] = "Content not found."
        except Exception as e:
            blog["content"] = f"Error reading content: {str(e)}"
    
    return blogs_data

# Blog endpoints
@api_router.get("/blogs", response_model=List[BlogSummary])
async def get_blogs():
    """Get all blog posts summary"""
    try:
        blogs_data = read_blog_files()
        return [BlogSummary(**{k: v for k, v in blog.items() if k != 'content' and k != 'filename'}) 
                for blog in blogs_data]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching blogs: {str(e)}")

@api_router.get("/blogs/{blog_id}", response_model=BlogPost)
async def get_blog(blog_id: str):
    """Get a specific blog post by ID"""
    try:
        blogs_data = read_blog_files()
        for blog in blogs_data:
            if blog["id"] == blog_id:
                return BlogPost(**{k: v for k, v in blog.items() if k != 'filename'})
        raise HTTPException(status_code=404, detail="Blog post not found")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching blog: {str(e)}")

# Existing routes
@api_router.get("/")
async def root():
    return {"message": "Welcome to New York Dairy Co. API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()