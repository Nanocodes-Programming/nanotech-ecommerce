'use client'
import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { API_URL } from '../../constants/api';
import FlashCard from '../utils/cards/FlashCard';
import FlashCardSkeleton from '../utils/skeletons/FlashCardSkeleton';

const styles = {
  container: 'w-full bg-gray-50 py-10 px-4',
  innerContainer: 'max-w-7xl mx-auto',
  headerSection: 'text-center mb-8',
  titleContainer: 'relative inline-block',
  title: 'text-2xl font-bold text-gray-800 mx-auto relative z-10',
  titleLine: 'absolute left-0 right-0 h-0.5 bg-blue-600 bottom-0 z-0',
  flashSaleWrapper: 'flex items-center justify-center gap-3 mb-6',
  flashIcon: 'text-yellow-500 w-6 h-6',
  counterSection: 'flex items-center justify-center gap-4 mb-6',
  timeUnit: 'bg-blue-600 text-white text-xl font-bold rounded-md px-4 py-2 min-w-[60px] text-center',
  timeSeparator: 'text-2xl font-bold text-gray-400',
  unitLabel: 'text-xs text-gray-500 mt-1 text-center',
  productsRow: 'flex flex-wrap justify-center gap-6 max-w-6xl mx-auto',
  viewAllButton: 'bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md px-6 py-2 mt-8 transition-all duration-300 mx-auto block',
  navigationContainer: 'flex items-center justify-center mt-10 gap-4',
  navButton: 'flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow text-blue-600 transition-all',
  navDisabled: 'opacity-50 cursor-not-allowed',
  navArrow: 'w-5 h-5',
  pageIndicator: 'text-sm text-gray-600',
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

const FlashCardsContainer = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 29,
    seconds: 57
  });
  
  // Fetch products data
  const url = `${API_URL}/products?is_pack=true`;
  const { data: products } = useSWR(url);
  
  // Update items per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerPage(1);
      } else if (width < 768) {
        setItemsPerPage(2);
      } else if (width < 1280) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(4);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
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
  
  // Pagination
  const totalPages = products ? Math.ceil(products.length / itemsPerPage) : 0;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products ? products.slice(startIndex, endIndex) : [];
  
  const goToNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  
  const goToPrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  
  // Format with leading zero
  const formatNumber = (num) => num.toString().padStart(2, '0');

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.headerSection}>
          <div className={styles.flashSaleWrapper}>
            <FlashIcon />
            <div className={styles.titleContainer}>
              <h2 className={styles.title}>Flash Sales</h2>
              <div className={styles.titleLine}></div>
            </div>
          </div>
          
          <div className={styles.counterSection}>
            <div>
              <div className={styles.timeUnit}>{formatNumber(timeLeft.hours)}</div>
              <div className={styles.unitLabel}>Hours</div>
            </div>
            <div className={styles.timeSeparator}>:</div>
            <div>
              <div className={styles.timeUnit}>{formatNumber(timeLeft.minutes)}</div>
              <div className={styles.unitLabel}>Minutes</div>
            </div>
            <div className={styles.timeSeparator}>:</div>
            <div>
              <div className={styles.timeUnit}>{formatNumber(timeLeft.seconds)}</div>
              <div className={styles.unitLabel}>Seconds</div>
            </div>
          </div>
        </div>
        
        <div className={styles.productsRow}>
          {products ? (
            currentProducts.map((product, index) => (
              <FlashCard 
                product={product} 
                key={product._id || product.id || `product-${index}`} 
              />
            ))
          ) : (
            Array(itemsPerPage).fill(0).map((_, index) => (
              <FlashCardSkeleton key={`skeleton-${index}`} />
            ))
          )}
        </div>
        
        <button className={styles.viewAllButton}>View All Products</button>
        
        {totalPages > 1 && (
          <div className={styles.navigationContainer}>
            <button 
              onClick={goToPrevPage}
              disabled={page === 1}
              className={`${styles.navButton} ${page === 1 ? styles.navDisabled : ''}`}
              aria-label="Previous page"
            >
              <LeftArrow />
            </button>
            
            <span className={styles.pageIndicator}>
              Page {page} of {totalPages}
            </span>
            
            <button 
              onClick={goToNextPage}
              disabled={page === totalPages}
              className={`${styles.navButton} ${page === totalPages ? styles.navDisabled : ''}`}
              aria-label="Next page"
            >
              <RightArrow />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashCardsContainer;