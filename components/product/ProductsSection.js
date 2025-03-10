import { useState, useEffect, useRef, useCallback } from 'react';
import useSWR from 'swr';
import { API_URL } from '../../constants/api';
import GroceryCard from '../utils/cards/GroceryCard';
import GroceryCardSkeleton from '../utils/skeletons/GroceryCardSkeleton';
import groceryImg from '../../images/grocery-png.png';

const ProductsSection = ({ initialCategory = 'all' }) => {
  const [prodCat, setProdCat] = useState(initialCategory);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 8; // Initial load and each subsequent load
  const containerRef = useRef(null);
  const categoryScrollRef = useRef(null);
  
  // Fetch all categories
  const categoriesUrl = `${API_URL}/category/`;
  const { data: categories } = useSWR(categoriesUrl);
  
  // Keep the original URL structure for products
  const productsUrl = prodCat === 'all'
    ? `${API_URL}/products/`
    : `${API_URL}/category/${prodCat}`;
    
  const { data: products, error } = useSWR(productsUrl);

  // Reset when category changes
  useEffect(() => {
    setVisibleProducts([]);
    setPage(1);
    setHasMore(true);
  }, [prodCat]);

  // Load initial products when data is available
  useEffect(() => {
    if (products) {
      const initialItems = products.slice(0, itemsPerPage);
      setVisibleProducts(initialItems);
      setHasMore(products.length > itemsPerPage);
    }
  }, [products]);

  // Infinite scroll functionality
  const loadMoreProducts = useCallback(() => {
    if (products && hasMore) {
      const nextPageIndex = page + 1;
      const startIndex = page * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      
      if (startIndex < products.length) {
        const nextProducts = products.slice(startIndex, endIndex);
        setVisibleProducts(prev => [...prev, ...nextProducts]);
        setPage(nextPageIndex);
        setHasMore(endIndex < products.length);
      } else {
        setHasMore(false);
      }
    }
  }, [products, page, hasMore, itemsPerPage]);

  // Handle scroll event for loading more products
  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      // Load more when user scrolls to bottom (with a small threshold)
      if (scrollTop + clientHeight >= scrollHeight - 100 && hasMore) {
        loadMoreProducts();
      }
    }
  }, [loadMoreProducts, hasMore]);

  // Set up scroll event listener
  useEffect(() => {
    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  // Handle category change
  const handleCategoryChange = (category) => {
    setProdCat(category);
  };

  // Scroll category into view when selected
  useEffect(() => {
    if (categoryScrollRef.current) {
      const selectedCategory = categoryScrollRef.current.querySelector(`[data-category="${prodCat}"]`);
      if (selectedCategory) {
        selectedCategory.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest',
          inline: 'center' 
        });
      }
    }
  }, [prodCat]);

  return (
    <div className="w-full">
      {/* Horizontal Category Filter */}
      <div 
        ref={categoryScrollRef}
        className="w-full overflow-x-auto pb-4 mb-6 hide-scrollbar"
      >
        <div className="flex gap-3 min-w-max px-1">
          {/* All Products Filter */}
          <button
            onClick={() => handleCategoryChange('all')}
            data-category="all"
            className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all whitespace-nowrap ${
              prodCat === 'all'
                ? 'bg-white shadow-md border-l-2 border-[#FFB800] text-[#FFB800]'
                : 'bg-white shadow hover:shadow-md text-gray-800'
            }`}
          >
            <img
              src={groceryImg.src}
              alt="all gadgets"
              width={24}
              className="object-cover"
            />
            <span className="font-medium">All Products</span>
          </button>

          {/* Category Filters */}
          {categories?.map((category) => (
            <button
              key={category.id || category._id || category.slug}
              onClick={() => handleCategoryChange(category.slug || category.id || category._id)}
              data-category={category.slug || category.id || category._id}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all whitespace-nowrap ${
                prodCat === (category.slug || category.id || category._id)
                  ? 'bg-white shadow-md border-l-2 border-[#FFB800] text-[#FFB800]'
                  : 'bg-white shadow hover:shadow-md text-gray-800'
              }`}
            >
              {category.image && (
                <img
                  src={category.image}
                  alt={category.name || "Category"}
                  width={24}
                  className="object-cover"
                />
              )}
              <span className="font-medium capitalize">{category.name || category.slug?.replace(/-/g, ' ')}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Category title and product count */}
      {products && products.length > 0 && (
        <div className="mb-6 px-1">
          <h2 className="text-xl font-semibold text-gray-800 capitalize">
            {prodCat === 'all' ? 'All Products' : prodCat.replace(/-/g, ' ')}
            <span className="ml-2 text-sm text-gray-500">
              ({products.length})
            </span>
          </h2>
        </div>
      )}
    
      {/* Products grid with hidden scrollbar but functional infinite scroll */}
      <div 
        ref={containerRef}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 overflow-auto no-scrollbar max-h-[45rem]"
      >
        {/* Loading state */}
        {!products && !error && (
          Array(8).fill(0).map((_, index) => (
            <GroceryCardSkeleton key={`skeleton-${index}`} />
          ))
        )}
        
        {/* Error state */}
        {error && (
          <div className="col-span-full py-8 text-center text-red-500">
            <p className="text-lg font-medium">Failed to load products</p>
            <p className="mt-2">Please try again later</p>
          </div>
        )}

        {/* Empty state */}
        {products && products.length === 0 && (
          <div className="col-span-full py-16 text-center text-gray-500">
            <p className="text-lg font-medium">No products found</p>
            <p className="mt-2">Try selecting a different category</p>
          </div>
        )}
        
        {/* Products */}
        {visibleProducts.map((product) => (
          <GroceryCard 
            product={product} 
            key={product.id || product._id || `product-${Math.random()}`} 
          />
        ))}
        
        {/* Loading indicator at bottom */}
        {hasMore && products && visibleProducts.length > 0 && (
          <div className="col-span-full flex justify-center py-4">
            <div className="w-6 h-6 border-t-2 border-blue-500 rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* CSS for hiding scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
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

export default ProductsSection;