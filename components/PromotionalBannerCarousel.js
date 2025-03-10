'use client'
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import nanobanner from '@/images/nanobanner.png';
import nanobanner1 from '@/images/nanoflier.png';
import nanobanner2 from '@/images/nanosticker.png';

const styles = {
  container: 'w-full bg-white py-6 px-4',
  innerContainer: 'max-w-7xl mx-auto relative',
  carouselContainer: 'overflow-hidden rounded-lg shadow-md',
  carouselTrack: 'flex transition-transform duration-500 ease-out',
  slide: 'w-full flex-shrink-0 relative',
  bannerLink: 'block w-full h-full',
  bannerImage: 'w-full h-[300px] object-cover object-center',
  loadingPlaceholder: 'w-full h-[300px] bg-gray-100 animate-pulse flex items-center justify-center',
  loadingText: 'text-gray-400 text-sm',
  indicators: 'flex justify-center gap-2 mt-4',
  indicator: 'w-2.5 h-2.5 rounded-full bg-gray-300 transition-all duration-300 cursor-pointer hover:bg-gray-400',
  activeIndicator: 'w-4 bg-blue-500 hover:bg-blue-600',
  arrowButtons: 'hidden md:block',
  arrowButton: 'absolute top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md z-10 cursor-pointer hover:bg-opacity-100 transition-all',
  leftArrow: 'left-4',
  rightArrow: 'right-4',
  arrowIcon: 'w-6 h-6 text-gray-800',
};

// Banner data with links
const bannerData = [
  {
    id: 1,
    image: nanobanner,
    link: '/collections/summer-sale'
  },
  {
    id: 2,
    image: nanobanner1,
    link: '/collections/new-arrivals'
  },
  {
    id: 3,
    image: nanobanner2,
    link: '/collections/clearance'
  }
];

const PromotionalBannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const intervalRef = useRef(null);
  const slidesRef = useRef([]);

  // Initialize image loaded state
  useEffect(() => {
    const initialLoadState = {};
    bannerData.forEach(banner => {
      initialLoadState[banner.id] = false;
    });
    setImagesLoaded(initialLoadState);
  }, []);

  // Load adjacent slides' images
  useEffect(() => {
    // Mark adjacent slides to be loaded
    const nextIndex = (currentSlide + 1) % bannerData.length;
    const prevIndex = (currentSlide - 1 + bannerData.length) % bannerData.length;
    
    // We're just marking them to be loaded, not using the browser's Image constructor
    // since it conflicts with Next.js Image component
    setImagesLoaded(prev => ({
      ...prev,
      [bannerData[nextIndex].id]: true, 
      [bannerData[prevIndex].id]: true
    }));
  }, [currentSlide]);

  // Lazy loading with Intersection Observer
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const slideId = entry.target.dataset.id;
          if (slideId) {
            // Mark this slide as should be loaded
            setImagesLoaded(prev => ({
              ...prev,
              [slideId]: true
            }));
            observer.unobserve(entry.target);
          }
        }
      });
    }, options);

    // Observe all slides
    slidesRef.current.forEach(slide => {
      if (slide) {
        observer.observe(slide);
      }
    });

    return () => {
      if (slidesRef.current) {
        slidesRef.current.forEach(slide => {
          if (slide) {
            observer.unobserve(slide);
          }
        });
      }
    };
  }, []);

  // Autoplay functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % bannerData.length);
      }, 5000);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying]);
  
  // Pause autoplay on hover
  const pauseAutoplay = () => setIsAutoPlaying(false);
  const resumeAutoplay = () => setIsAutoPlaying(true);
  
  // Navigation functions
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  
  const goToPreviousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerData.length) % bannerData.length);
  };
  
  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerData.length);
  };

  // Handle image load completion
  const handleImageLoad = (id) => {
    setImagesLoaded(prev => ({
      ...prev,
      [id]: true
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div 
          className={styles.carouselContainer}
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
        >
          <div 
            className={styles.carouselTrack}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {bannerData.map((banner, index) => (
              <div 
                key={banner.id} 
                className={styles.slide}
                ref={el => slidesRef.current[index] = el}
                data-id={banner.id}
              >
                <Link href={banner.link} className={styles.bannerLink}>
                  {/* Only fully render images when needed */}
                  {(index === currentSlide || index === 0 || imagesLoaded[banner.id]) && (
                    <>
                      {!imagesLoaded[banner.id] && (
                        <div className={styles.loadingPlaceholder}>
                          <span className={styles.loadingText}>Loading...</span>
                        </div>
                      )}
                      <Image 
                        src={banner.image}
                        alt="Promotional banner"
                        width={1200}
                        height={300}
                        className={`${styles.bannerImage} ${!imagesLoaded[banner.id] ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                        priority={index === 0 || index === currentSlide}
                        quality={index === currentSlide ? 90 : 75}
                        onLoad={() => handleImageLoad(banner.id)}
                      />
                    </>
                  )}
                </Link>
              </div>
            ))}
          </div>
          
          {/* Arrow Navigation */}
          <div className={styles.arrowButtons}>
            <button 
              onClick={goToPreviousSlide}
              className={`${styles.arrowButton} ${styles.leftArrow}`}
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.arrowIcon}>
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            
            <button 
              onClick={goToNextSlide}
              className={`${styles.arrowButton} ${styles.rightArrow}`}
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.arrowIcon}>
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Slide Indicators */}
        <div className={styles.indicators}>
          {bannerData.map((_, index) => (
            <button
              key={`indicator-${index}`}
              onClick={() => goToSlide(index)}
              className={`${styles.indicator} ${currentSlide === index ? styles.activeIndicator : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromotionalBannerCarousel;