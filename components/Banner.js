import React, { useState, useEffect } from 'react';
import Header from './Header';
import CategoryFilter from './CategoryFilter';
import visionpro from '../public/images/vision.png';
import visionpro1 from '../public/images/visionpro.png';
import headset from '../public/images/headset.webp';
import mouse from '../public/images/mouse.webp';
import keyboard from '../public/images/keyboard.webp';
import girlyheady from '../public/images/girlyheady.png';
import { API_URL } from '@/constants/api';
import useSWR from 'swr';

const Banner = ({onCategoryChange}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const categoriesUrl = `${API_URL}/category/`;
  const { data: categories, error } = useSWR(categoriesUrl);
  const slides = [
    {
      id: 0,
      title: "PlayStation VR",
      subtitle: "Bundle includes: PS VR headset, PS Camera",
      buttonText: "LEARN MORE",
      leftImage: visionpro,
      rightImage: visionpro1, 
    },
    {
      id: 1,
      title: "Latest Gadgets",
      subtitle: "Experience next-gen mobile technology",
      buttonText: "SHOP NOW",
      leftImage: keyboard, 
      rightImage: mouse, 
    },
    {
      id: 2,
      title: "Smart Home Devices",
      subtitle: "Transform your living space with tech",
      buttonText: "DISCOVER",
      leftImage: girlyheady, 
      rightImage: headset, 
    }
  ];

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentSlide]);

  const handleNextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const handlePrevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev === 0 ? 2 : prev - 1));
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const goToSlide = (index) => {
    if (!isTransitioning && index !== currentSlide) {
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const handleCategorySelection = (category) => {
    setActiveCategory(category);
    // Pass the selected category to the parent component (which will handle filtering products)
    if (onCategoryChange) {
      onCategoryChange(category);
    }
    console.log(`Category changed to: ${category}`);
  };

  return (
    <div className="mx-auto w-full">
      {/* Custom animation keyframes */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            25% { transform: translateY(-8px) rotate(1deg); }
            75% { transform: translateY(8px) rotate(-1deg); }
          }
          
          @keyframes floatReverse {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            25% { transform: translateY(8px) rotate(-1deg); }
            75% { transform: translateY(-8px) rotate(1deg); }
          }
          
          @keyframes dangle {
            0%, 100% { transform: rotate(-3deg); }
            50% { transform: rotate(3deg); }
          }
          
          @keyframes glow {
            0%, 100% { filter: drop-shadow(0 0 5px rgba(0, 102, 255, 0.5)); }
            50% { filter: drop-shadow(0 0 15px rgba(0, 102, 255, 0.8)); }
          }
          
          @keyframes orbit {
            0% { transform: rotate(0deg) translateX(10px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(10px) rotate(-360deg); }
          }
          
          @keyframes pingSlow {
            0% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.2); opacity: 0.4; }
            100% { transform: scale(1); opacity: 0.8; }
          }
          
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes moveInOut {
            0%, 100% { transform: translateX(0) translateY(0); }
            25% { transform: translateX(5px) translateY(-5px); }
            50% { transform: translateX(10px) translateY(0); }
            75% { transform: translateX(5px) translateY(5px); }
          }
          
          @keyframes fadeInOutOpacity {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.3; }
          }
          
          @keyframes textReveal {
            0% { transform: translateY(20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          
          @keyframes textFadeIn {
            0% { opacity: 0; transform: translateX(-10px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          
          .animate-float-reverse {
            animation: floatReverse 6s ease-in-out infinite;
          }
          
          .animate-dangle {
            animation: dangle 4s ease-in-out infinite;
            transform-origin: top center;
          }
          
          .animate-glow {
            animation: glow 4s ease-in-out infinite;
          }
          
          .animate-orbit {
            animation: orbit 12s linear infinite;
          }
          
          .animate-ping-slow {
            animation: pingSlow 3s ease-in-out infinite;
          }
          
          .animate-gradient-shift {
            animation: gradientShift 15s ease infinite;
            background-size: 200% 200%;
          }
          
          .animate-move-in-out {
            animation: moveInOut 12s ease-in-out infinite;
          }
          
          .animate-fade-in-out {
            animation: fadeInOutOpacity 8s ease-in-out infinite;
          }
          
          .animate-text-reveal {
            animation: textReveal 0.8s ease-out forwards;
          }
          
          .animate-text-fade-in {
            animation: textFadeIn 0.8s ease-out forwards;
          }
        `}
      </style>

      {/* Main Banner */}
      <div className="relative w-full rounded overflow-hidden shadow-xl">
        {/* Updated background to match Elevate Gaming aesthetic */}
        <div className="w-full h-[80vh] relative overflow-hidden bg-[#0B0719]">
          {/* Background gradient overlay similar to Elevate Gaming */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0719] via-[#17143a] to-[#0B0719] opacity-90"></div>
            <div className="absolute inset-0 bg-[url('/images/noise-texture.png')] opacity-5 mix-blend-overlay"></div>
          </div>

          {/* Dynamic subtle accents for premium feel */}
          <div className="absolute inset-0 z-1">
            {/* Glow effects similar to Elevate Gaming */}
            <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-pink-600/10 blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-blue-600/10 blur-3xl"></div>
            <div className="absolute top-1/2 right-1/3 w-40 h-40 rounded-full bg-purple-600/10 blur-3xl animate-pulse"></div>
          </div>

          {/* Header - Mobile Responsive */}
          <div className="w-full z-20 relative">
            <Header />
          </div>

          {/* Carousel slides */}
          <div className="relative h-full w-full overflow-hidden z-10">
            {slides.map((slide, index) => (
              <div 
                key={slide.id}
                className={`absolute inset-0 flex flex-col md:flex-row h-full w-full transition-all duration-500 ease-in-out ${
                  index === currentSlide 
                    ? 'opacity-100 transform translate-x-0' 
                    : index < currentSlide || (currentSlide === 0 && index === 2)
                      ? 'opacity-0 transform -translate-x-full' 
                      : 'opacity-0 transform translate-x-full'
                }`}
              >
                {/* Slide content - Flexbox changes for mobile */}
                <div className="flex flex-col md:flex-row h-full w-full relative">
                  {/* Mobile background image - Large and positioned behind text */}
                  <div className="md:hidden absolute inset-0 flex items-center justify-center z-0 opacity-30">
                    <img 
                      src={slide.rightImage.src} 
                      alt={slide.title}
                      className="h-full w-full object-contain animate-dangle animate-glow"
                    />
                  </div>
                  
                  {/* Left side - Person with product */}
                  <div className="hidden md:flex w-full md:w-1/3 h-1/3 md:h-full items-center justify-center relative overflow-hidden">
                    {/* Enhanced glow effect */}
                    <div className="absolute w-40 h-40 md:w-56 md:h-56 bg-pink-500/20 rounded-full blur-xl animate-ping-slow"></div>
                    <img 
                      src={slide.leftImage.src} 
                      alt={`Person with ${slide.title}`}
                      className="h-full object-contain transition-all duration-700 transform animate-float animate-glow"
                      style={{ 
                        animationDelay: '0.5s' 
                      }}
                    />
                  </div>
                  
                  {/* Center - Text and button - Full width on mobile */}
                  <div className="w-full md:w-1/3 h-full flex flex-col justify-center items-center text-center px-4 md:px-0 z-10">
                    <h2 
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 opacity-0 animate-text-reveal"
                      style={{ animationDelay: '0.3s' }}
                    >
                      {slide.title}
                    </h2>
                    <p 
                      className="text-sm sm:text-base md:text-lg text-gray-300 mb-4 opacity-0 animate-text-reveal"
                      style={{ animationDelay: '0.5s' }}
                    >
                      {slide.subtitle}
                    </p>
                    {/* Updated button style to match Elevate Gaming gradient */}
                    <button 
                      className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white text-xs sm:text-sm font-medium py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg opacity-0 animate-text-reveal"
                      style={{ animationDelay: '0.7s' }}
                    >
                      {slide.buttonText}
                    </button>
                  </div>
                  
                  {/* Right side - Product image with dangling animation */}
                  <div className="hidden md:flex w-full md:w-1/3 h-1/3 md:h-full items-center justify-center relative">
                    {/* Enhanced glow effect to match Elevate Gaming */}
                    <div className="absolute w-40 h-40 md:w-56 md:h-56 bg-blue-600/20 rounded-full blur-xl animate-ping-slow" style={{ animationDelay: '1s' }}></div>
                    <img 
                      src={slide.rightImage.src} 
                      alt={slide.title}
                      className="h-full object-contain transition-all duration-700 animate-dangle animate-glow"
                      style={{ 
                        animationDelay: '1s'
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Navigation arrows with updated styling to match dark theme */}
        <button 
          onClick={handlePrevSlide}
          className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-gray-900/70 hover:bg-gray-800 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-lg z-10 border border-gray-700 transition-colors duration-300"
          aria-label="Previous slide"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={handleNextSlide}
          className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-gray-900/70 hover:bg-gray-800 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-lg z-10 border border-gray-700 transition-colors duration-300"
          aria-label="Next slide"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Indicator dots with updated styling */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-pink-600 w-3 sm:w-4' 
                  : 'bg-gray-500 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Categories section styled with darker theme */}
      <div className="mx-auto max-w-6xl  py-4">
        <CategoryFilter 
          activeCategory={activeCategory} 
          onCategoryChange={handleCategorySelection} 
        />
      </div>
    </div>
  );
};

export default Banner;