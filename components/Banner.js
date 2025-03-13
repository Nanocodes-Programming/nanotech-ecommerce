import React, { useState, useEffect } from 'react';
import Header from './Header';
import CategoryFilter from './CategoryFilter';
import visionpro from '@/images/vision.png';
import visionpro1 from '@/images/visionpro.png';
import headset from '@/images/headset.webp';
import mouse from '@/images/mouse.webp';
import keyboard from '@/images/keyboard.webp';
import girlyheady from '@/images/girlyheady.png';

// Category images - replace with your actual images
const categoryImages = {
  smartphone: '/api/placeholder/60/60?text=Phone',
  laptops: '/api/placeholder/60/60?text=Laptop',
  headphones: '/api/placeholder/60/60?text=Headphones',
  electronics: '/api/placeholder/60/60?text=Electronics',
  games: '/api/placeholder/60/60?text=Games',
  washing: '/api/placeholder/60/60?text=Washing',
  vacuum: '/api/placeholder/60/60?text=Vacuum',
  camera: '/api/placeholder/60/60?text=Camera',
};

// Categories data with images
const categories = [
  { id: 'smartphone', name: 'Smartphone', image: categoryImages.smartphone },
  { id: 'laptops', name: 'Laptops & MacBook', image: categoryImages.laptops },
  { id: 'headphones', name: 'Headphones', image: categoryImages.headphones },
  { id: 'electronics', name: 'Electronics', image: categoryImages.electronics },
  { id: 'games', name: 'Games & Controls', image: categoryImages.games },
  { id: 'washing', name: 'Washing Machine', image: categoryImages.washing },
  { id: 'vacuum', name: 'Vacuum', image: categoryImages.vacuum },
  { id: 'camera', name: 'Camera', image: categoryImages.camera },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeCategory, setActiveCategory] = useState('laptops'); // Default to laptops as shown in the image
  
  // Slide content with different images for each slide
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

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    // Additional logic for category change can go here
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
            0%, 100% { filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.5)); }
            50% { filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.8)); }
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
        {/* Animated gradient background */}
        <div className="w-full h-[80vh] bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 animate-gradient-shift relative overflow-hidden">
          {/* Header - Mobile Responsive */}
          <div className="w-full">
            <Header />
          </div>

          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
            {/* Dynamic background shapes */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-[10%] left-[5%] w-32 h-32 bg-blue-400/5 rounded-full animate-ping-slow"></div>
              <div className="absolute bottom-[20%] right-[10%] w-40 h-40 bg-blue-300/5 rounded-full animate-ping-slow" style={{ animationDelay: '2s' }}></div>
              <div className="absolute top-[30%] right-[15%] w-24 h-24 bg-indigo-400/5 rounded-full animate-ping-slow" style={{ animationDelay: '1s' }}></div>
            </div>
            
            {/* Geometric pattern elements */}
            <div className="absolute top-10 right-10 w-6 h-6 md:w-10 md:h-10 border-2 border-blue-300 opacity-20 transform rotate-12 animate-pulse"></div>
            <div className="absolute top-20 right-20 w-10 h-10 md:w-16 md:h-16 border-2 border-blue-300 opacity-10 transform -rotate-12 animate-fade-in-out"></div>
            <div className="absolute bottom-10 right-6 w-8 h-8 md:w-12 md:h-12 border-2 border-blue-300 opacity-20 transform rotate-45 animate-move-in-out"></div>
            <div className="hidden md:block absolute top-32 left-20 w-8 h-8 border-2 border-blue-300 opacity-10 transform animate-orbit" style={{ animationDelay: '2s' }}></div>
            
            {/* Additional decorative elements */}
            <svg className="absolute top-[15%] left-[20%] w-16 h-16 text-blue-300/10 animate-move-in-out" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <svg className="absolute bottom-[25%] right-[25%] w-24 h-24 text-blue-300/10 animate-move-in-out" style={{ animationDelay: '3s' }} viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          
          {/* Carousel slides */}
          <div className="relative h-full w-full overflow-hidden">
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
                    {/* Animated glow effect */}
                    <div className="absolute w-24 h-24 md:w-36 md:h-36 bg-blue-500/10 rounded-full animate-ping-slow"></div>
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
                      className="text-sm sm:text-base md:text-lg text-blue-100 mb-4 opacity-0 animate-text-reveal"
                      style={{ animationDelay: '0.5s' }}
                    >
                      {slide.subtitle}
                    </p>
                    <button 
                      className="bg-yellow-400 hover:bg-yellow-500 text-black text-xs sm:text-sm font-bold py-2 px-6 rounded-md transition-all duration-300 transform hover:scale-105 shadow-md opacity-0 animate-text-reveal"
                      style={{ animationDelay: '0.7s' }}
                    >
                      {slide.buttonText}
                    </button>
                  </div>
                  
                  {/* Right side - Product image with dangling animation */}
                  <div className="hidden md:flex w-full md:w-1/3 h-1/3 md:h-full items-center justify-center relative">
                    {/* Animated glow effect */}
                    <div className="absolute w-24 h-24 md:w-36 md:h-36 bg-blue-400/20 rounded-full animate-ping-slow" style={{ animationDelay: '1s' }}></div>
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
        
        {/* Navigation arrows with proper icons */}
        <button 
          onClick={handlePrevSlide}
          className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-white/90 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-lg z-10 border border-gray-200 hover:bg-white transition-colors duration-300"
          aria-label="Previous slide"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={handleNextSlide}
          className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-white/90 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-lg z-10 border border-gray-200 hover:bg-white transition-colors duration-300"
          aria-label="Next slide"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Indicator dots with animations */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-white w-3 sm:w-4' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Categories section styled like the image */}
      <div className="mx-auto max-w-6xl">
        <CategoryFilter 
          categories={categories} 
          activeCategory={activeCategory} 
          onCategoryChange={handleCategoryChange} 
        />
      </div>
    </div>
  );
};

export default Banner;