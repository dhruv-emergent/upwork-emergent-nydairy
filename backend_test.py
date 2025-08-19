#!/usr/bin/env python3
"""
Backend API Testing for New York Dairy Co. Website
Tests all API endpoints and validates blog functionality
"""

import requests
import sys
from datetime import datetime
import json

class DairyAPITester:
    def __init__(self, base_url="https://local-milk-stories.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.expected_blog_ids = [
            "farm-fresh-benefits",
            "sustainable-farming", 
            "artisan-cheese-making",
            "local-dairy-health-benefits",
            "seasonal-dairy-recipes"
        ]

    def run_test(self, name, method, endpoint, expected_status, data=None, validate_func=None):
        """Run a single API test with optional validation"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            print(f"   Status Code: {response.status_code}")
            
            # Check status code
            status_ok = response.status_code == expected_status
            if not status_ok:
                print(f"❌ Failed - Expected status {expected_status}, got {response.status_code}")
                if response.text:
                    print(f"   Response: {response.text[:200]}...")
                return False, {}

            # Parse JSON response
            try:
                response_data = response.json()
            except json.JSONDecodeError:
                print(f"❌ Failed - Invalid JSON response")
                print(f"   Response: {response.text[:200]}...")
                return False, {}

            # Run custom validation if provided
            if validate_func:
                validation_result = validate_func(response_data)
                if not validation_result:
                    print(f"❌ Failed - Validation failed")
                    return False, response_data

            self.tests_passed += 1
            print(f"✅ Passed")
            return True, response_data

        except requests.exceptions.RequestException as e:
            print(f"❌ Failed - Network error: {str(e)}")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Unexpected error: {str(e)}")
            return False, {}

    def validate_welcome_message(self, data):
        """Validate the welcome message response"""
        if not isinstance(data, dict):
            print("   Expected dict response")
            return False
        if 'message' not in data:
            print("   Missing 'message' field")
            return False
        if 'New York Dairy Co.' not in data['message']:
            print("   Message doesn't contain 'New York Dairy Co.'")
            return False
        print(f"   Message: {data['message']}")
        return True

    def validate_blogs_list(self, data):
        """Validate the blogs list response"""
        if not isinstance(data, list):
            print("   Expected list response")
            return False
        
        if len(data) != 5:
            print(f"   Expected 5 blogs, got {len(data)}")
            return False

        print(f"   Found {len(data)} blog posts")
        
        # Check each blog has required fields
        required_fields = ['id', 'title', 'excerpt', 'reading_time', 'publish_date', 'tags']
        for i, blog in enumerate(data):
            for field in required_fields:
                if field not in blog:
                    print(f"   Blog {i+1} missing field: {field}")
                    return False
            
            # Check if blog ID is in expected list
            if blog['id'] not in self.expected_blog_ids:
                print(f"   Unexpected blog ID: {blog['id']}")
                return False
                
            print(f"   Blog {i+1}: {blog['title'][:50]}...")

        return True

    def validate_individual_blog(self, data, blog_id):
        """Validate individual blog post response"""
        if not isinstance(data, dict):
            print("   Expected dict response")
            return False

        required_fields = ['id', 'title', 'excerpt', 'content', 'reading_time', 'publish_date', 'tags']
        for field in required_fields:
            if field not in data:
                print(f"   Missing field: {field}")
                return False

        if data['id'] != blog_id:
            print(f"   ID mismatch: expected {blog_id}, got {data['id']}")
            return False

        if not data['content'] or len(data['content']) < 100:
            print(f"   Content too short or missing: {len(data.get('content', ''))}")
            return False

        if not data['tags'] or len(data['tags']) == 0:
            print("   No tags found")
            return False

        # Validate image URL - CRITICAL for the fix
        if 'image_url' not in data or not data['image_url']:
            print("   Missing or empty image_url field")
            return False
        
        image_url = data['image_url']
        if not image_url.startswith('https://picsum.photos/'):
            print(f"   Image URL should use Picsum, got: {image_url}")
            return False
        
        # Special check for seasonal-dairy-recipes
        if blog_id == 'seasonal-dairy-recipes':
            expected_url = 'https://picsum.photos/800/600?random=105'
            if image_url != expected_url:
                print(f"   Seasonal dairy recipes image URL mismatch:")
                print(f"   Expected: {expected_url}")
                print(f"   Got: {image_url}")
                return False
            print(f"   ✅ Seasonal dairy recipes has correct Picsum URL: {image_url}")

        print(f"   Title: {data['title']}")
        print(f"   Image URL: {image_url}")
        print(f"   Content length: {len(data['content'])} characters")
        print(f"   Tags: {', '.join(data['tags'])}")
        print(f"   Reading time: {data['reading_time']}")
        
        return True

    def test_welcome_endpoint(self):
        """Test the root API endpoint"""
        return self.run_test(
            "Welcome Message",
            "GET", 
            "api/",
            200,
            validate_func=self.validate_welcome_message
        )

    def test_blogs_list(self):
        """Test the blogs list endpoint"""
        return self.run_test(
            "Blogs List",
            "GET",
            "api/blogs", 
            200,
            validate_func=self.validate_blogs_list
        )

    def test_individual_blog(self, blog_id):
        """Test individual blog endpoint"""
        return self.run_test(
            f"Individual Blog ({blog_id})",
            "GET",
            f"api/blogs/{blog_id}",
            200,
            validate_func=lambda data: self.validate_individual_blog(data, blog_id)
        )

    def test_nonexistent_blog(self):
        """Test 404 handling for non-existent blog"""
        return self.run_test(
            "Non-existent Blog (404 test)",
            "GET",
            "api/blogs/non-existent-blog",
            404
        )

def main():
    print("🧪 Starting New York Dairy Co. API Tests")
    print("=" * 50)
    
    tester = DairyAPITester()
    
    # Test welcome endpoint
    success, _ = tester.test_welcome_endpoint()
    if not success:
        print("\n❌ Welcome endpoint failed - stopping tests")
        return 1

    # Test blogs list
    success, blogs_data = tester.test_blogs_list()
    if not success:
        print("\n❌ Blogs list endpoint failed - stopping tests")
        return 1

    # Test each individual blog
    for blog_id in tester.expected_blog_ids:
        success, _ = tester.test_individual_blog(blog_id)
        if not success:
            print(f"\n❌ Blog {blog_id} endpoint failed")

    # Test 404 handling
    tester.test_nonexistent_blog()

    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Final Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed! Backend API is working correctly.")
        return 0
    else:
        print(f"⚠️  {tester.tests_run - tester.tests_passed} tests failed.")
        return 1

if __name__ == "__main__":
    sys.exit(main())