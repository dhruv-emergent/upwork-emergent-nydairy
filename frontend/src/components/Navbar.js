import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Our Story', href: '#about' },
    { name: 'Blog', href: '/blogs' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href) => {
    if (href.startsWith('#')) {
      // Scroll to section
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const handleVisitStore = () => {
    window.open('https://maps.google.com/search/dairy+farm+store+cooperstown+ny', '_blank');
  };

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">NY</span>
              </div>
              <span className="font-playfair text-2xl font-bold text-green-800">
                New York Dairy Co.
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              item.href.startsWith('#') ? (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                >
                  {item.name}
                </Link>
              )
            ))}
            <button onClick={handleVisitStore} className="btn-primary">
              Visit Farm Store
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                item.href.startsWith('#') ? (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className={`nav-link ${isActive(item.href) ? 'active' : ''} px-4 py-2 text-left`}
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`nav-link ${isActive(item.href) ? 'active' : ''} px-4 py-2`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <div className="px-4 pt-2">
                <button onClick={handleVisitStore} className="btn-primary w-full">
                  Visit Farm Store
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;