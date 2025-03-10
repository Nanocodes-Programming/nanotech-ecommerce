'use client'
import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { API_URL } from '../../constants/api';
import FlashCard from '../utils/cards/FlashCard';
import FlashCardSkeleton from '../utils/skeletons/FlashCardSkeleton';

const styles = {
  container: 'w-full bg-white py-6 px-4',
  innerContainer: 'max-w-7xl mx-auto',
  headerSection: 'flex items-center justify-between mb-6',
  titleContainer: 'flex items-center',
  title: 'text-xl font-bold text-gray-800 flex items-center',
  flashIcon: 'text-yellow-400 w-5 h-5 mr-2',
  timeLeft: 'text-gray-700 font-medium ml-2',
  viewAllLink: 'text-blue-600 font-medium hover:underline flex items-center',
  arrowIcon: 'w-4 h-4 ml-1',
  carouselContainer: 'relative overflow-x-auto hide-scrollbar pb-4',
  carouselTrack: 'flex gap-6 w-max',
  scrollButtons: 'hidden md:flex items-center justify-between absolute top-1/2 left-0 right-0 -translate-y-1/2 z-10 px-1 pointer-events-none',
  scrollButton: 'w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md pointer-events-auto cursor-pointer hover:bg-gray-100 border border-gray-200',
  navArrow: 'w-5 h-5 text-blue-600',
  progressContainer: 'mt-4 bg-gray-200 h-1 rounded-full overflow-hidden mb-6',
  progressBar: 'h-full bg-blue-500 rounded-full transition-all duration-300',
  navigationArrows: 'flex justify-between absolute -left-4 -right-4 top-1/2 -translate-y-1/2 z-10',
  arrowButton: 'w-8 h-8 flex items-center justify-center bg-white shadow-md rounded-full border border-gray-200',
};

// Icons
const FlashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.flashIcon}>
    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
  </svg>
);

const LeftArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.navArrow}>
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
);

const RightArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.navArrow}>
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.arrowIcon}>
    <path d="M9 18l6-6-6-6"/>
  </svg>
);

const FlashCardsContainer = () => {
  const carouselRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    hours: 20,
    minutes: 23,
    seconds: 16
  });
  
  // Fetch products data
  const url = `${API_URL}/products?is_pack=true`;
  const { data: products } = useSWR(url);
  
  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Scroll functions
  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(progress);
    }
  };
  
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -400,
        behavior: 'smooth'
      });
    }
  };
  
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 400,
        behavior: 'smooth'
      });
    }
  };
  
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, []);
  
  // Format timer display
  const formatTimeDisplay = () => {
    const { hours, minutes, seconds } = timeLeft;
    return `${hours}h : ${minutes}m : ${seconds}s`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.headerSection}>
          <h2 className={styles.title}>
            <FlashIcon />
            Flash Sale
            <span className={styles.timeLeft}>— Time Left: {formatTimeDisplay()}</span>
          </h2>
          
          <a href="#view-all" className={styles.viewAllLink}>
            See All
            <ChevronRight />
          </a>
        </div>
        
        <div className={styles.progressContainer}>
          <div 
            className={styles.progressBar} 
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>
        
        <div className="relative">
          <div 
            className={styles.carouselContainer}
            ref={carouselRef}
          >
            <div className={styles.carouselTrack}>
              {products ? (
                products.map((product, index) => (
                  <FlashCard 
                    product={product} 
                    key={product._id || product.id || `product-${index}`} 
                  />
                ))
              ) : (
                Array(8).fill(0).map((_, index) => (
                  <FlashCardSkeleton key={`skeleton-${index}`} />
                ))
              )}
            </div>
          </div>
          
          <div className={styles.navigationArrows}>
            <button 
              onClick={scrollLeft}
              className={styles.arrowButton}
              aria-label="Scroll left"
            >
              <LeftArrow />
            </button>
            
            <button 
              onClick={scrollRight}
              className={styles.arrowButton}
              aria-label="Scroll right"
            >
              <RightArrow />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCardsContainer;