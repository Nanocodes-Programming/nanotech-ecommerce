import React, { useEffect, useRef } from 'react';
import useSWR from 'swr';
import { API_URL } from '@/constants/api';

const CategoryFilter = ({ 
  activeCategory = 'all',
  onCategoryChange = () => {} 
}) => {
  const categoryScrollRef = useRef(null);
  
  // Fetch categories from API
  const categoriesUrl = `${API_URL}/category/`;
  const { data: fetchedCategories, error } = useSWR(categoriesUrl);
  
  // Add "All" category to the list of categories from API
  const categories = fetchedCategories ? [
    { id: 'all', slug: 'all', name: 'All', image: '/images/categories/all.png' },
    ...fetchedCategories
  ] : null;
  
  // Scroll category into view when selected
  useEffect(() => {
    if (categoryScrollRef.current) {
      const selectedCategory = categoryScrollRef.current.querySelector(`[data-category="${activeCategory}"]`);
      if (selectedCategory) {
        selectedCategory.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest',
          inline: 'center' 
        });
      }
    }
  }, [activeCategory]);

  // Create placeholder categories for loading state
  const placeholderCategories = Array.from({ length: 8 }, (_, i) => ({ 
    id: `placeholder-${i+1}`, 
    name: 'Loading' 
  }));

  // Handle arrow navigation
  const scrollRight = () => {
    if (categoryScrollRef.current) {
      categoryScrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };
  
  const scrollLeft = () => {
    if (categoryScrollRef.current) {
      categoryScrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full mb-4 mt-4">
      {/* Left scroll button */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-8 h-8 shadow-md z-10 flex items-center justify-center border border-gray-200"
        aria-label="Scroll left"
      >
        <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      {/* Categories container */}
      <div 
        ref={categoryScrollRef}
        className="flex overflow-x-auto px-10 space-x-4 py-2 no-scrollbar justify-center"
      >
        {/* Loading state */}
        {!categories && !error && 
          placeholderCategories.map((placeholder) => (
            <div
              key={placeholder.id}
              className="flex-shrink-0 flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse mb-2"></div>
              <div className="w-16 h-3 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))
        }

        {/* Error state */}
        {error && (
          <div className="flex items-center justify-center text-red-500 text-sm px-4">
            Failed to load categories
          </div>
        )}

        {/* Categories */}
        {categories?.map((category) => {
          // Handle different API response formats
          const categoryId = category.slug || category.id || category._id;
          const categoryName = category.name || (category.slug ? category.slug.replace(/-/g, ' ') : 'Category');
          const isActive = activeCategory === categoryId;
          
          return (
            <div
              key={categoryId}
              onClick={() => onCategoryChange(categoryId)}
              data-category={categoryId}
              className="flex-shrink-0 flex flex-col items-center cursor-pointer group transition-all duration-200 justify-center"
            >
              {/* Image container with highlight border */}
              <div className={`w-16 h-16 rounded-lg overflow-hidden mb-2 ${
                isActive 
                  ? 'ring-2 ring-yellow-400 border-2 border-yellow-400' 
                  : 'border border-gray-200'
              } ${isActive ? 'bg-yellow-50' : 'bg-white'}`}>
                <div className="w-full h-full flex items-center justify-center p-2">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={categoryName}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-400">
                        {categoryName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Category name */}
              <span className={`text-xs text-center capitalize ${
                isActive ? 'font-semibold text-yellow-500' : 'text-gray-700'
              }`}>
                {categoryName}
              </span>
            </div>
          );
        })}

        {/* Only loading placeholders will show if API data is not yet available */}
      </div>
      
      {/* Right scroll button */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-8 h-8 shadow-md z-10 flex items-center justify-center border border-gray-200"
        aria-label="Scroll right"
      >
        <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* CSS for hiding scrollbar */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default CategoryFilter;