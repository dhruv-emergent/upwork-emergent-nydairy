import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  CalendarIcon, 
  ClockIcon, 
  ArrowLeftIcon, 
  ShareIcon,
  HeartIcon 
} from '@heroicons/react/24/outline';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BlogPost = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${API}/blogs/${blogId}`);
        setBlog(response.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setError('Blog post not found.');
        } else {
          setError('Failed to load blog post. Please try again later.');
        }
        console.error('Error fetching blog:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  const formatContent = (content) => {
    // Convert markdown-style content to HTML-friendly format
    return content
      .split('\n')
      .map((line, index) => {
        // Handle headers
        if (line.startsWith('## ')) {
          return `<h2 key="${index}">${line.substring(3)}</h2>`;
        }
        if (line.startsWith('### ')) {
          return `<h3 key="${index}">${line.substring(4)}</h3>`;
        }
        if (line.startsWith('#### ')) {
          return `<h4 key="${index}">${line.substring(5)}</h4>`;
        }
        
        // Handle bold text
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Handle italic text
        line = line.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // Handle links
        line = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-green-600 hover:text-green-700 underline" target="_blank" rel="noopener noreferrer">$1</a>');
        
        // Handle empty lines
        if (line.trim() === '') {
          return '<br/>';
        }
        
        // Regular paragraphs
        return `<p key="${index}">${line}</p>`;
      })
      .join('\n');
  };

  const [isShared, setIsShared] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: window.location.href,
        });
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      } catch (err) {
        console.error('Error copying to clipboard:', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      }
    }
  };

  const handleSave = () => {
    // Save to localStorage for demo purposes
    const savedBlogs = JSON.parse(localStorage.getItem('savedBlogs') || '[]');
    if (!savedBlogs.includes(blog.id)) {
      savedBlogs.push(blog.id);
      localStorage.setItem('savedBlogs', JSON.stringify(savedBlogs));
      setIsSaved(true);
    } else {
      // Remove from saved
      const updatedSaved = savedBlogs.filter(id => id !== blog.id);
      localStorage.setItem('savedBlogs', JSON.stringify(updatedSaved));
      setIsSaved(false);
    }
  };

  // Check if blog is already saved on component mount
  useState(() => {
    if (blog) {
      const savedBlogs = JSON.parse(localStorage.getItem('savedBlogs') || '[]');
      setIsSaved(savedBlogs.includes(blog.id));
    }
  }, [blog]);

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4 text-xl">{error}</p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => navigate('/blogs')}
              className="btn-secondary"
            >
              Back to Blog
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button 
            onClick={() => navigate('/blogs')}
            className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Blog
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-96 bg-gradient-to-r from-green-800 to-green-600 overflow-hidden">
        <img 
          src={blog.image_url} 
          alt={blog.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 to-transparent"></div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        {/* Article Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-green-800 mb-6 leading-tight">
            {blog.title}
          </h1>
          
          <div className="flex items-center justify-between text-gray-600 mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2" />
                {blog.publish_date}
              </div>
              <div className="flex items-center">
                <ClockIcon className="h-5 w-5 mr-2" />
                {blog.reading_time}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleShare}
                className={`flex items-center transition-colors ${
                  isShared 
                    ? 'text-green-600' 
                    : 'text-gray-500 hover:text-green-600'
                }`}
              >
                <ShareIcon className="h-5 w-5 mr-1" />
                {isShared ? 'Shared!' : 'Share'}
              </button>
              <button 
                onClick={handleSave}
                className={`flex items-center transition-colors ${
                  isSaved 
                    ? 'text-red-600' 
                    : 'text-gray-500 hover:text-red-500'
                }`}
              >
                <HeartIcon className={`h-5 w-5 mr-1 ${isSaved ? 'fill-current' : ''}`} />
                {isSaved ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>
          
          <p className="text-xl text-gray-700 leading-relaxed italic">
            {blog.excerpt}
          </p>
        </div>

        {/* Article Body */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div 
            className="blog-content prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: formatContent(blog.content) }}
          />
        </div>

        {/* Author Bio */}
        <div className="bg-green-100 rounded-2xl p-8 mb-8">
          <div className="flex items-start space-x-6">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              NY
            </div>
            <div className="flex-1">
              <h3 className="font-playfair text-2xl font-bold text-green-800 mb-2">
                New York Dairy Co. Team
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our farm family has been dedicated to sustainable dairy farming in New York for over 75 years. 
                We're passionate about sharing our knowledge of regenerative agriculture, artisan cheese making, 
                and the benefits of fresh, local dairy products.
              </p>
              <div className="flex space-x-4">
                <Link to="/blogs" className="text-green-600 hover:text-green-700 font-semibold">
                  More Articles
                </Link>
                <a href="#contact" className="text-green-600 hover:text-green-700 font-semibold">
                  Visit Our Farm
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="font-playfair text-2xl font-bold text-green-800 mb-6">
            More Farm Stories
          </h3>
          <div className="text-center">
            <Link to="/blogs" className="btn-primary">
              Explore All Blog Posts
            </Link>
          </div>
        </div>
      </article>

      {/* Newsletter CTA */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-3xl font-bold mb-4">
            Enjoyed this story?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Subscribe to our newsletter for more farm stories, recipes, and updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 border border-green-600 bg-transparent rounded-full text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button className="bg-white text-green-800 px-8 py-4 rounded-full font-semibold hover:bg-green-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;