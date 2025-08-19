import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, HeartIcon, ShieldCheckIcon, SunIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

const HomePage = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const features = [
    {
      icon: HeartIcon,
      title: 'Farm Fresh Quality',
      description: 'Our milk travels from pasture to your table within 24-48 hours, ensuring maximum freshness and nutritional value.',
      image: 'https://picsum.photos/400/300?random=1'
    },
    {
      icon: ShieldCheckIcon,  
      title: 'Sustainable Practices',
      description: 'We use regenerative farming methods that improve soil health and sequester carbon while producing exceptional dairy.',
      image: 'https://picsum.photos/400/300?random=2'
    },
    {
      icon: SunIcon,
      title: 'Seasonal Variations', 
      description: 'Experience the natural rhythm of farming with dairy products that reflect what our cows eat throughout the seasons.',
      image: 'https://picsum.photos/400/300?random=3'
    }
  ];

  const stats = [
    { number: '75+', label: 'Years of Family Farming' },
    { number: '85', label: 'Happy Cows' },
    { number: '350', label: 'Acres of Pasture' },
    { number: '6', label: 'Artisan Cheese Varieties' }
  ];

  const handleVisitFarmStore = () => {
    // Use a more direct approach that won't be blocked by popup blockers
    window.location.href = 'https://www.google.com/maps/search/?api=1&query=New+York+Dairy+Farm+Store+Cooperstown+NY';
  };

  const handleGetDirections = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=123+Dairy+Farm+Road+Cooperstown+NY+13326', '_blank');
  };

  const handleCallUs = () => {
    window.location.href = 'tel:+16075556455';
  };

  const handleNewsletterSignup = (e) => {
    e.preventDefault();
    if (email) {
      // In a real app, this would send to your email service
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section min-h-screen flex items-center justify-center text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/1920/1080?random=10" 
            alt="New York dairy farm with cows in green pastures"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.background = 'linear-gradient(135deg, #065f46 0%, #10b981 100%)';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-600/60"></div>
        </div>
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
            <button onClick={handleVisitFarmStore} className="btn-secondary">
              Visit Our Farm Store
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
              <div key={index} className="feature-card text-center bg-white rounded-2xl overflow-hidden">
                <div className="h-48 overflow-hidden bg-green-100">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback to a solid color background with icon
                      e.target.style.display = 'none';
                      e.target.parentElement.classList.add('flex', 'items-center', 'justify-center');
                      e.target.parentElement.innerHTML = `<div class="text-center"><div class="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div></div>`;
                    }}
                  />
                </div>
                <div className="p-6">
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
                  src="https://picsum.photos/600/400?random=20" 
                  alt="Jersey cows grazing in New York pastures with farm buildings in background"
                  className="rounded-2xl shadow-2xl w-full h-auto"
                  onError={(e) => {
                    // Fallback to a solid background with text if image fails
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="rounded-2xl shadow-2xl w-full h-96 bg-gradient-to-br from-green-200 to-green-400 flex items-center justify-center"><div class="text-center text-green-800"><div class="text-6xl mb-4">🐄</div><p class="text-xl font-semibold">Our Dairy Farm</p><p class="text-lg">New York Pastures</p></div></div>';
                  }}
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-green-200 rounded-full blur-xl opacity-60"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-200 rounded-full blur-xl opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-4xl font-bold text-green-800 mb-6">
            Stay Updated with Farm Fresh News
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Subscribe to our newsletter for seasonal recipes, farm updates, and special offers.
          </p>
          <form onSubmit={handleNewsletterSignup} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-6 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button type="submit" className="btn-primary px-8 whitespace-nowrap">
              {subscribed ? '✓ Subscribed!' : 'Subscribe'}
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-4">
            We respect your privacy and never share your information.
          </p>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-green-800 mb-6">
              Stories from Our Farm
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the stories behind our dairy practices, seasonal recipes, and the 
              science of sustainable farming through our informative blog posts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="blog-card bg-white rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=250&fit=crop" 
                alt="Fresh farm milk being poured"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-playfair text-xl font-semibold text-green-800 mb-3">
                  Farm Fresh Benefits
                </h3>
                <p className="text-gray-600 mb-4">
                  Discover why farm-fresh milk makes all the difference in taste and nutrition.
                </p>
                <Link to="/blogs/farm-fresh-benefits" className="text-green-600 hover:text-green-700 font-semibold">
                  Read More →
                </Link>
              </div>
            </div>

            <div className="blog-card bg-white rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=250&fit=crop" 
                alt="Sustainable dairy farm with renewable energy"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-playfair text-xl font-semibold text-green-800 mb-3">
                  Sustainable Practices
                </h3>
                <p className="text-gray-600 mb-4">
                  Learn how we're protecting tomorrow's pastures through regenerative farming.
                </p>
                <Link to="/blogs/sustainable-farming" className="text-green-600 hover:text-green-700 font-semibold">
                  Read More →
                </Link>
              </div>
            </div>

            <div className="blog-card bg-white rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=250&fit=crop" 
                alt="Artisan cheese wheels aging in cave"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-playfair text-xl font-semibold text-green-800 mb-3">
                  Artisan Cheese Making
                </h3>
                <p className="text-gray-600 mb-4">
                  Explore the art of traditional cheese making with modern innovations.
                </p>
                <Link to="/blogs/artisan-cheese-making" className="text-green-600 hover:text-green-700 font-semibold">
                  Read More →
                </Link>
              </div>
            </div>
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
            <button 
              onClick={handleGetDirections}
              className="bg-white text-green-800 px-8 py-4 rounded-full font-semibold hover:bg-green-50 transition-colors inline-flex items-center justify-center"
            >
              <MapPinIcon className="h-5 w-5 mr-2" />
              Get Directions
            </button>
            <button 
              onClick={handleCallUs}
              className="border-2 border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-green-800 transition-colors inline-flex items-center justify-center"
            >
              <PhoneIcon className="h-5 w-5 mr-2" />
              Call Us Today
            </button>
          </div>
          <div className="text-green-200 space-y-2">
            <p className="flex items-center justify-center">
              <MapPinIcon className="h-5 w-5 mr-2" />
              123 Dairy Farm Road, Cooperstown, NY 13326
            </p>
            <p className="flex items-center justify-center">
              <PhoneIcon className="h-5 w-5 mr-2" />
              (607) 555-MILK
            </p>
            <p>🕒 Open Daily 7AM - 7PM</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;