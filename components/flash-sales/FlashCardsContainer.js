'use client'
import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { API_URL } from '../../constants/api';
import CleanProductCard from '../utils/cards/CleanProductCard';


const TrendingProductsCarousel = () => {
  const carouselRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 4 });
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Fetch trending products data
  const url = `${API_URL}/products?is_pack=true`;
  const { data: products, isLoading } = useSWR(url);
  
  // Handle scroll events
  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(progress);
      
      // Calculate which products are currently visible
      const itemWidth = 280 + 24; // card width + gap
      const start = Math.floor(scrollLeft / itemWidth);
      const visibleCount = Math.ceil(clientWidth / itemWidth);
      const end = Math.min(start + visibleCount, products?.length || 0);
      
      setVisibleRange({ start, end: end - 1 });
    }
  };
  
  // Scroll functions with improved behavior
  const scrollLeft = () => {
    if (carouselRef.current && !isScrolling) {
      setIsScrolling(true);
      const itemWidth = 280 + 24; // card width + gap
      const currentScroll = carouselRef.current.scrollLeft;
      const targetScroll = Math.max(currentScroll - (itemWidth * 2), 0);
      
      carouselRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
      
      setTimeout(() => setIsScrolling(false), 500);
    }
  };
  
  const scrollRight = () => {
    if (carouselRef.current && !isScrolling) {
      setIsScrolling(true);
      const itemWidth = 280 + 24; // card width + gap
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const targetScroll = Math.min(scrollLeft + (itemWidth * 2), scrollWidth - clientWidth);
      
      carouselRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
      
      setTimeout(() => setIsScrolling(false), 500);
    }
  };
  
  // Pagination dots calculation
  const calculatePaginationDots = () => {
    if (!products?.length) return [];
    
    const itemWidth = 280 + 24; // card width + gap
    const viewportWidth = carouselRef.current?.clientWidth || 0;
    const itemsPerPage = Math.floor(viewportWidth / itemWidth);
    const totalDots = Math.ceil(products.length / itemsPerPage);
    
    return Array(totalDots).fill(0);
  };
  
  const getCurrentDot = () => {
    if (!carouselRef.current || !products?.length) return 0;
    
    const itemWidth = 280 + 24; // card width + gap
    const viewportWidth = carouselRef.current.clientWidth;
    const itemsPerPage = Math.floor(viewportWidth / itemWidth);
    const currentPage = Math.floor(visibleRange.start / itemsPerPage);
    
    return currentPage;
  };
  
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      
      // Initial scroll position check
      handleScroll();
      
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, [products]);
  
  // Debounce window resize events
  useEffect(() => {
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        handleScroll();
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="w-full py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header with title and navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="inline-block w-10 h-10 rounded-full bg-blue-600 mr-3 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </span>
              Trending Products
            </h2>
            <p className="text-gray-500 ml-12">Discover what everyone's buying right now</p>
          </div>
          
          <div className="flex items-center">
            <a href="/trending" className="text-blue-600 font-medium hover:text-blue-800 transition-colors mr-6">
              View All
            </a>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={scrollLeft}
                className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 ${
                  scrollProgress <= 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'
                }`}
                disabled={scrollProgress <= 0}
                aria-label="Previous products"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              <button 
                onClick={scrollRight}
                className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 ${
                  scrollProgress >= 100 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'
                }`}
                disabled={scrollProgress >= 100}
                aria-label="Next products"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Elegant progress bar */}
        <div className="h-1 w-full bg-gray-100 rounded-full mb-6 overflow-hidden">
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>
        
        {/* Carousel container */}
        <div className="relative">
          <div 
            ref={carouselRef}
            className="overflow-x-auto hide-scrollbar pb-10 -mx-4 px-4"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <div className="flex gap-6 w-max">
              {isLoading || !products ? (
                // Loading skeletons
                Array(8).fill(0).map((_, index) => (
                  <ProductCardSkeleton key={`skeleton-${index}`} />
                ))
              ) : (
                // Product cards
                products.map((product, index) => (
                  <div 
                    key={product._id || product.id || `product-${index}`}
                    className="transition-all duration-500 ease-out"
                  >
                    <CleanProductCard product={product} />
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Pagination dots for mobile */}
          <div className="flex justify-center mt-4 sm:hidden">
            {calculatePaginationDots().map((_, index) => (
              <span 
                key={`dot-${index}`}
                className={`w-2 h-2 mx-1 rounded-full transition-all duration-300 ${
                  getCurrentDot() === index ? 'bg-blue-600 w-4' : 'bg-gray-300'
                }`}
              ></span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Custom scrollbar CSS */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @media (min-width: 640px) {
          .hide-scrollbar {
            mask-image: linear-gradient(to right, 
              rgba(0, 0, 0, 1) 80%, 
              rgba(0, 0, 0, 0)
            );
            -webkit-mask-image: linear-gradient(to right, 
              rgba(0, 0, 0, 1) 80%, 
              rgba(0, 0, 0, 0)
            );
          }
        }
      `}</style>
    </section>
  );
};

// Create a skeleton loader for product cards
const ProductCardSkeleton = () => (
  <div className="w-[280px] rounded-lg overflow-hidden bg-white border border-gray-200">
    <div className="w-full h-64 bg-gray-200 animate-pulse"></div>
    <div className="p-4">
      <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
    </div>
  </div>
);

export default TrendingProductsCarousel;