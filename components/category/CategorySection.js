import { useState, useEffect } from 'react';
import fresh from '../../images/headset.png'; // You might want to replace this with a tech image
import CategoryCardContainer from './CategoryCardContainer';

const styles = {
  main: 'relative flex flex-col justify-between my-8 overflow-hidden',
  titleWrapper: 'flex flex-col justify-center md:justify-start items-center md:items-start transition-all duration-500',
  title: 'ml-3 xl:ml-32 max-w-md font-extrabold text-4xl md:text-5xl text-center md:text-left text-gray-800 leading-tight',
  subtitle: 'ml-3 xl:ml-32 mt-4 max-w-sm text-gray-600 text-center md:text-left',
  categoryWrapper: 'flex flex-col mt-12 md:mt-24 transition-all duration-500',
  categoryText: 'ml-3 xl:ml-32 font-bold text-3xl text-gray-800 mb-6',
  decorativeLine: 'ml-3 xl:ml-32 w-24 h-1 bg-blue-600 rounded-full mb-8',
  imageContainer: 'absolute right-0 -z-10 transition-all duration-700 ease-in-out',
};

const CategorySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Add animation when component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.main}>
      <div 
        className={`${styles.imageContainer} transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}
      >
        <img 
          src={fresh.src} 
          alt="Latest tech gadgets" 
          width={350} 
          className="filter drop-shadow-xl"
        />
      </div>
      
      <div className={`${styles.titleWrapper} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <p className={styles.title}>
          Discover Cutting-Edge Tech Gadgets
        </p>
        <p className={styles.subtitle}>
          The latest innovations and must-have devices at your fingertips
        </p>
      </div>
      
      <div className={`${styles.categoryWrapper} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <p className={styles.categoryText}>Shop Tech Categories</p>
        <div className={styles.decorativeLine}></div>
        <CategoryCardContainer />
      </div>
    </div>
  );
};

export default CategorySection;