import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, HeartIcon, ShieldCheckIcon, SunIcon } from '@heroicons/react/24/outline';

const HomePage = () => {
  const features = [
    {
      icon: HeartIcon,
      title: 'Farm Fresh Quality',
      description: 'Our milk travels from pasture to your table within 24-48 hours, ensuring maximum freshness and nutritional value.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Sustainable Practices',
      description: 'We use regenerative farming methods that improve soil health and sequester carbon while producing exceptional dairy.'
    },
    {
      icon: SunIcon,
      title: 'Seasonal Variations',
      description: 'Experience the natural rhythm of farming with dairy products that reflect what our cows eat throughout the seasons.'
    }
  ];

  const stats = [
    { number: '75+', label: 'Years of Family Farming' },
    { number: '85', label: 'Happy Cows' },
    { number: '350', label: 'Acres of Pasture' },
    { number: '6', label: 'Artisan Cheese Varieties' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section min-h-screen flex items-center justify-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-green-600/50"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 fade-in-up">
            Fresh from Our
            <span className="block text-green-300">New York Pastures</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light opacity-90 fade-in-up">
            Three generations of sustainable dairy farming, bringing you the freshest milk, 
            cream, and artisan cheeses in the heart of New York State.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up">
            <Link to="/blogs" className="btn-primary inline-flex items-center">
              Read Our Story
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <button className="btn-secondary">
              Visit Our Farm
            </button>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-green-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="stats-card">
                <div className="font-playfair text-4xl font-bold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-green-800 mb-6">
              Why Choose Our Dairy?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe that great dairy starts with healthy, happy cows and sustainable farming practices. 
              Every product we create reflects our commitment to quality and our love for the land.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="feature-card text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-playfair text-2xl font-semibold text-green-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-playfair text-4xl font-bold text-green-800 mb-6">
                Three Generations of Dairy Excellence
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 1948 by the Johnson family, New York Dairy Co. has been committed to 
                producing the finest dairy products using traditional methods combined with modern 
                sustainable practices. Our 350-acre farm in the heart of New York's dairy country 
                is home to 85 happy cows that graze on pesticide-free pastures.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We believe that great dairy comes from great care—care for our animals, our land, 
                and our community. Every glass of milk, every wheel of cheese, and every dollop 
                of cream tells the story of our commitment to quality and sustainability.
              </p>
              <Link to="/blogs" className="btn-primary inline-flex items-center">
                Learn More About Our Practices
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="relative">
              <div className="blog-image">
                <img 
                  src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=600&h=400&fit=crop" 
                  alt="Cows grazing in New York pastures"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-green-200 rounded-full blur-xl opacity-60"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-200 rounded-full blur-xl opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-green-800 mb-6">
              From Our Farm Blog
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the stories behind our dairy practices, seasonal recipes, and the 
              science of sustainable farming through our informative blog posts.
            </p>
          </div>

          <div className="text-center">
            <Link to="/blogs" className="btn-primary inline-flex items-center text-lg px-8 py-4">
              Read All Our Stories
              <ArrowRightIcon className="ml-2 h-6 w-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-green-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
            Visit Our Farm Store
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Experience the difference of farm-fresh dairy products. Our store is open daily, 
            offering fresh milk, artisan cheeses, and seasonal specialties.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="bg-white text-green-800 px-8 py-4 rounded-full font-semibold hover:bg-green-50 transition-colors">
              Get Directions
            </button>
            <button className="border-2 border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-green-800 transition-colors">
              Call Us Today
            </button>
          </div>
          <div className="text-green-200">
            <p className="mb-2">📍 123 Dairy Farm Road, Cooperstown, NY 13326</p>
            <p className="mb-2">📞 (607) 555-MILK</p>
            <p>🕒 Open Daily 7AM - 7PM</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;