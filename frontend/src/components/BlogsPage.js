import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CalendarIcon, ClockIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSignup = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${API}/blogs`);
        setBlogs(response.data);
      } catch (err) {
        setError('Failed to load blog posts. Please try again later.');
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Loading our farm stories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-green-800 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6">
            Stories from the Farm
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Discover the stories behind sustainable dairy farming, seasonal recipes, 
            health benefits, and the art of artisan cheese making in New York State.
          </p>
          <div className="w-24 h-1 bg-green-300 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <article key={blog.id} className={`blog-card ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                <div className="blog-image h-64">
                  <img 
                    src={blog.image_url} 
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-playfair text-2xl font-bold text-green-800 mb-3 line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {blog.publish_date}
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-2" />
                      {blog.reading_time}
                    </div>
                  </div>
                  <Link 
                    to={`/blogs/${blog.id}`}
                    className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors"
                  >
                    Read Full Story
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-4xl font-bold text-green-800 mb-6">
            Stay Updated with Our Farm Stories
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Subscribe to our newsletter for the latest blog posts, seasonal recipes, 
            and updates from New York Dairy Co.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button className="btn-primary px-8">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            We respect your privacy and never share your information.
          </p>
        </div>
      </section>
    </div>
  );
};

export default BlogsPage;