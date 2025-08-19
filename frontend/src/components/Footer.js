import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  ClockIcon 
} from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">NY</span>
              </div>
              <span className="font-playfair text-2xl font-bold">
                New York Dairy Co.
              </span>
            </div>
            <p className="text-green-100 leading-relaxed mb-6 max-w-md">
              Three generations of sustainable dairy farming in the heart of New York State. 
              We're committed to producing the finest milk, cream, and artisan cheeses while 
              caring for our land and community.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-green-200 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-green-200 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="text-green-200 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.098.119.112.223.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.758-1.378l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.989C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
              <a href="#" className="text-green-200 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-green-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-green-200 hover:text-white transition-colors">
                  Our Blog
                </Link>
              </li>
              <li>
                <a href="#about" className="text-green-200 hover:text-white transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors">
                  Farm Tours
                </a>
              </li>
              <li>
                <a href="#contact" className="text-green-200 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-playfair text-lg font-semibold mb-6">Visit Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPinIcon className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div className="text-green-200">
                  <p>123 Dairy Farm Road</p>
                  <p>Cooperstown, NY 13326</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-green-400 flex-shrink-0" />
                <a href="tel:607-555-6455" className="text-green-200 hover:text-white transition-colors">
                  (607) 555-MILK
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-green-400 flex-shrink-0" />
                <a href="mailto:hello@newyorkdairy.co" className="text-green-200 hover:text-white transition-colors">
                  hello@newyorkdairy.co
                </a>
              </div>
              
              <div className="flex items-start space-x-3">
                <ClockIcon className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div className="text-green-200">
                  <p>Farm Store Hours:</p>
                  <p>Daily 7AM - 7PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-green-800 mt-12 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="font-playfair text-xl font-semibold mb-4">
              Stay Connected
            </h3>
            <p className="text-green-200 mb-6">
              Get farm updates, seasonal recipes, and exclusive offers.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-green-800 border border-green-700 rounded-l-lg text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-r-lg font-semibold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-green-300 text-sm">
          <p>© {currentYear} New York Dairy Co. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Sustainability</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;