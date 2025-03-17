'use client';

import Link from 'next/link';
import React, { useEffect } from 'react';

export default function AboutUs() {
  // Add scroll animation effect
  useEffect(() => {
    const handleScroll = () => {
      const parallaxElements = document.querySelectorAll('.parallax');
      parallaxElements.forEach(elem => {
        const scrollY = window.scrollY;
        const speed = parseFloat(elem.getAttribute('data-speed') || '0.1');
        elem.style.transform = `translateY(${scrollY * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0719] text-white relative overflow-hidden">
      {/* Custom CSS for gaming effects */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .glow-text {
          text-shadow: 0 0 10px rgba(0, 102, 255, 0.7);
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 4s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientShift 15s ease infinite;
        }
        
        .hex-grid {
          position: absolute;
          background-size: 50px 50px;
          background-image: 
            linear-gradient(to right, rgba(0, 102, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 102, 255, 0.05) 1px, transparent 1px);
          transform: rotate(45deg);
          opacity: 0.2;
        }
      `}</style>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B0719] via-[#17143a] to-[#0B0719]"></div>
        
        {/* Grid pattern */}
        <div className="hex-grid w-full h-full"></div>
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-2/3 left-1/3 w-48 h-48 rounded-full bg-pink-600/10 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header Placeholder - You would import your actual Header component here */}
      <div className="w-full py-6 bg-[#0B0719]/80 backdrop-blur-sm border-b border-blue-500/20 z-10">
        <div className="container mx-auto px-4">
          <Link href="/" className="flex items-center">
          <h2 className="text-2xl font-bold text-blue-400">Nanotech Store</h2>
          </Link>
         
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative w-full pt-16 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          {/* Decorative tech lines */}
          <div className="absolute top-0 left-1/2 w-px h-16 bg-gradient-to-b from-transparent via-blue-500 to-transparent"></div>
          
          {/* Title with glowing effect */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white glow-text mb-4 animate-float">
              About <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 animate-gradient">Us</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Your trusted destination for high-quality tech
            </p>
          </div>
          
          {/* Decorative elements */}
          <div className="hidden md:block absolute -bottom-8 left-1/4 transform -translate-x-1/2">
            <div className="w-32 h-32 border-2 border-blue-500/20 rounded-full"></div>
            <div className="w-24 h-24 border-2 border-blue-500/20 rounded-full absolute top-4 left-4"></div>
            <div className="w-16 h-16 border-2 border-blue-500/20 rounded-full absolute top-8 left-8"></div>
            <div className="w-8 h-8 bg-blue-500/20 rounded-full absolute top-12 left-12"></div>
          </div>
        </div>
      </div>

      {/* Main Content Section with futuristic border */}
      <div className="container mx-auto px-4 -mt-10 mb-16 relative z-20">
        <div className="relative p-1 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          <div className="absolute -inset-[1px] rounded-xl blur"></div>
          <div className="bg-[#0B0719]/90 backdrop-blur-sm rounded-xl p-8 text-blue-100">
            <p className="mb-8 text-lg">
              Welcome to Nanotech Store, your trusted destination for high-quality laptops and tech gadgets. We are committed to providing our customers with the best technology products at competitive prices, ensuring reliability, performance, and customer satisfaction.
            </p>

            <section className="mb-12 relative">
              <div className="absolute -left-4 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500"></div>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4 glow-text">Who We Are</h2>
              <div className="p-6 bg-[#17143a]/50 rounded-lg border border-blue-500/20">
                <p className="text-lg">
                  Nanotech Store is a leading online retailer specializing in laptops, accessories, and other tech gadgets. Our mission is to make technology accessible and affordable to everyone while maintaining the highest standards of quality and service.
                </p>
              </div>
            </section>

            <section className="mb-12 relative">
              <div className="absolute -left-4 h-full w-1 bg-gradient-to-b from-purple-500 to-pink-500"></div>
              <h2 className="text-2xl font-semibold text-purple-400 mb-4 glow-text">Why Choose Us?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-[#17143a]/30 rounded-lg border border-purple-500/20 flex relative group hover:bg-[#17143a]/50 transition-all duration-300">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-40 rounded-lg blur-sm transition-all duration-300"></div>
                  <div className="mr-4 text-purple-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="relative">
                    <h3 className="text-xl font-medium text-purple-300 mb-1">Quality Assurance</h3>
                    <p>We offer only top-quality laptops and tech gadgets from reputable brands.</p>
                  </div>
                </div>
                
                <div className="p-5 bg-[#17143a]/30 rounded-lg border border-blue-500/20 flex relative group hover:bg-[#17143a]/50 transition-all duration-300">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-pink-600 opacity-0 group-hover:opacity-40 rounded-lg blur-sm transition-all duration-300"></div>
                  <div className="mr-4 text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="relative">
                    <h3 className="text-xl font-medium text-blue-300 mb-1">6-Month Warranty</h3>
                    <p>Enjoy peace of mind with our 6-month warranty on all our products.</p>
                  </div>
                </div>
                
                <div className="p-5 bg-[#17143a]/30 rounded-lg border border-pink-500/20 flex relative group hover:bg-[#17143a]/50 transition-all duration-300">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-40 rounded-lg blur-sm transition-all duration-300"></div>
                  <div className="mr-4 text-pink-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="relative">
                    <h3 className="text-xl font-medium text-pink-300 mb-1">Fast & Secure Shipping</h3>
                    <p>We ensure timely delivery of all orders with secure payment options.</p>
                  </div>
                </div>
                
                <div className="p-5 bg-[#17143a]/30 rounded-lg border border-purple-500/20 flex relative group hover:bg-[#17143a]/50 transition-all duration-300">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-40 rounded-lg blur-sm transition-all duration-300"></div>
                  <div className="mr-4 text-purple-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="relative">
                    <h3 className="text-xl font-medium text-purple-300 mb-1">Excellent Support</h3>
                    <p>Our team is always available to assist with any inquiries or support you need.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12 relative">
              <div className="absolute -left-4 h-full w-1 bg-gradient-to-b from-pink-500 to-blue-500"></div>
              <h2 className="text-2xl font-semibold text-pink-400 mb-4 glow-text">Exclusive Membership Benefits</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div className="relative overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl"></div>
                  <div className="relative p-6 border border-blue-500/30 rounded-xl backdrop-blur-sm">
                    <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-blue-300">Subscribed Member</h3>
                      <span className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-300 text-sm">Free</span>
                    </div>
                    <div className="mb-6">
                      <div className="flex items-center text-2xl font-bold text-white mb-1">
                        <span className="text-blue-400">5%</span>
                        <span className="ml-2">Discount</span>
                      </div>
                      <p className="text-blue-200/80">on all purchases</p>
                    </div>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                        <span>Simply register on our website for free</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                        <span>Discount applied to every purchase</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="relative overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl"></div>
                  <div className="relative p-6 border border-pink-500/30 rounded-xl backdrop-blur-sm">
                    <div className="absolute -top-10 -right-10 w-20 h-20 bg-pink-500/10 rounded-full blur-xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl"></div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-pink-300">Premium Member</h3>
                      <span className="px-3 py-1 bg-pink-500/20 rounded-full text-pink-300 text-sm">₦40,000/year</span>
                    </div>
                    <div className="mb-6">
                      <div className="flex items-center text-2xl font-bold text-white mb-1">
                        <span className="text-pink-400">12%</span>
                        <span className="ml-2">Discount</span>
                      </div>
                      <p className="text-pink-200/80">on all purchases for an entire year</p>
                    </div>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                        <span>Upgrade to a paid membership</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                        <span>Higher discount rate on all purchases</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                        <span>Valid for one full year</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-blue-500/5 to-pink-500/5 border border-blue-500/20 rounded-lg">
                <p className="text-center">
                  At Nanotech Store, we believe in delivering value, quality, and exceptional service to our customers. Whether you're looking for a new laptop, accessories, or other tech gadgets, we've got you covered!
                </p>
              </div>
            </section>

            <section className="mb-8 relative">
              <div className="absolute -left-4 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500"></div>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4 glow-text">Contact Us</h2>
              <div className="bg-[#17143a]/50 p-6 rounded-lg border border-blue-500/30 backdrop-blur-sm">
                <p className="mb-4">For any inquiries about our products or services, reach out to us:</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 text-blue-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span><span className="text-blue-400 font-medium">Email:</span> <a href="mailto:sales@nanotech.nanocodes.com.ng" className="text-purple-400 hover:text-purple-300 underline">sales@nanotech.nanocodes.com.ng</a></span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 text-pink-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span><span className="text-pink-400 font-medium">Phone:</span> +234 812 494 6594</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 text-purple-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span><span className="text-purple-400 font-medium">Address:</span> AO7 Patsyl Plaza, Opposite Kenechukwu Microfinance Bank, Nsukka, Enugu, Nigeria</span>
                  </li>
                </ul>
              </div>
            </section>

            <footer className="text-center text-blue-300/70 text-sm border-t border-blue-500/20 pt-4 mt-8">
              <p>© 2025 Nanotech Store. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </div>

      {/* Tech circuit lines */}
      <div className="hidden md:block absolute bottom-0 right-0 w-96 h-96">
        <svg className="w-full h-full text-blue-500/20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M10,10 L30,10 L30,30 L50,30 L50,50 L70,50 L70,70 L90,70" stroke="currentColor" strokeWidth="0.5" fill="none"/>
          <path d="M10,30 L20,30 L20,50 L40,50 L40,70 L60,70 L60,90" stroke="currentColor" strokeWidth="0.5" fill="none"/>
          <path d="M30,10 L30,20 L50,20 L50,40 L70,40 L70,60 L90,60" stroke="currentColor" strokeWidth="0.5" fill="none"/>
          <circle cx="30" cy="10" r="2" fill="currentColor"/>
          <circle cx="30" cy="30" r="2" fill="currentColor"/>
          <circle cx="50" cy="30" r="2" fill="currentColor"/>
          <circle cx="50" cy="50" r="2" fill="currentColor"/>
          <circle cx="70" cy="50" r="2" fill="currentColor"/>
          <circle cx="70" cy="70" r="2" fill="currentColor"/>
          <circle cx="90" cy="70" r="2" fill="currentColor"/>
        </svg>
      </div>
    </div>
  );
}