import { useState, useEffect, useRef, useCallback } from 'react';
import useSWR from 'swr';
import { API_URL } from '../../constants/api';
import GroceryCard from '../utils/cards/GroceryCard';
import GroceryCardSkeleton from '../utils/skeletons/GroceryCardSkeleton';

const ProductsSection = ({ prodCat }) => {
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 8; // Initial load and each subsequent load
  const containerRef = useRef(null);
  
  // Keep the original URL structure
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

  return (
    <div className="flex-1">
      {/* Category title */}
      {products && products.length > 0 && (
        <div className="mb-4 px-1">
          <h2 className="text-lg font-medium text-gray-800 capitalize">
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
        className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 overflow-auto no-scrollbar max-h-[45rem]"
      >
        {/* Products */}
        {visibleProducts.map((product) => (
          <GroceryCard 
            product={product} 
            key={product.id || product._id || `product-${Math.random()}`} 
          />
        ))}
        
        {/* Loading state - using your original approach */}
        {products === undefined && <GroceryCardSkeleton />}
        
        {/* Loading indicator at bottom */}
        {hasMore && products && visibleProducts.length > 0 && (
          <div className="col-span-full flex justify-center py-4">
            <div className="w-6 h-6 border-t-2 border-blue-500 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsSection;