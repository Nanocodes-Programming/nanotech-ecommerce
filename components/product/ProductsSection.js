import { useState, useEffect, useMemo } from 'react';
import useSWR from 'swr';
import { API_URL } from '../../constants/api';
import GroceryCard from '../utils/cards/GroceryCard';
import GroceryCardSkeleton from '../utils/skeletons/GroceryCardSkeleton';

const ProductsSection = ({ 
  category = 'all', 
  itemsPerPage = 12,
  initialPage = 1 
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [sortOption, setSortOption] = useState('featured');
  
  // Build the products API URL based on category
  const productsUrl = category === 'all'
    ? `${API_URL}/products/`
    : `${API_URL}/category/${category}`;
    
  // Fetch product data with SWR
  const { data: products, error, isValidating } = useSWR(
    productsUrl,
    { 
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute cache
      errorRetryCount: 3 
    }
  );

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  // Sort the products based on selected sort option
  const sortedProducts = useMemo(() => {
    if (!products) return [];
    
    let sorted = [...products];
    
    switch (sortOption) {
      case 'price-low':
        return sorted.sort((a, b) => 
          (a.discount_price || a.price) - (b.discount_price || b.price)
        );
      case 'price-high':
        return sorted.sort((a, b) => 
          (b.discount_price || b.price) - (a.discount_price || a.price)
        );
      case 'newest':
        return sorted.sort((a, b) => 
          new Date(b.created_at || b.createdAt || 0) - 
          new Date(a.created_at || a.createdAt || 0)
        );
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'featured':
      default:
        return sorted;
    }
  }, [products, sortOption]);

  // Calculate pagination values
  const totalProducts = sortedProducts?.length || 0;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  
  // Get current page products
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedProducts.slice(startIndex, endIndex);
  }, [sortedProducts, currentPage, itemsPerPage]);
  
  // Format category name for display
  const formatCategoryName = (categorySlug) => {
    if (categorySlug === 'all') return 'All Products';
    return categorySlug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Handle page change
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of product section
    window.scrollTo({
      top: document.getElementById('products-grid')?.offsetTop - 100 || 0,
      behavior: 'smooth'
    });
  };

  // Previous page
  const previousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  // Next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Generate pagination numbers
  const paginationNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if there are few
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate range around current page
      let rangeStart = Math.max(2, currentPage - 1);
      let rangeEnd = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust range to always show 3 pages when possible
      if (currentPage <= 3) {
        rangeEnd = Math.min(4, totalPages - 1);
      } else if (currentPage >= totalPages - 2) {
        rangeStart = Math.max(totalPages - 3, 2);
      }
      
      // Add ellipsis if needed
      if (rangeStart > 2) {
        pages.push('...');
      }
      
      // Add range pages
      for (let i = rangeStart; i <= rangeEnd; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed
      if (rangeEnd < totalPages - 1) {
        pages.push('...');
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <section className="w-full py-8">
      {/* Category header with product count and sorting */}
      {products && (
        <div className="mb-8 px-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 capitalize">
              {formatCategoryName(category)}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {totalProducts} {totalProducts === 1 ? 'product' : 'products'} available
            </p>
          </div>
          
          {/* Sort dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-sm font-medium text-gray-600">
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border rounded-lg px-3 py-1.5 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </div>
      )}
    
      {/* Products grid */}
      <div 
        id="products-grid"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4  gap-6 px-4"
      >
        {/* Loading skeletons */}
        {!products && !error && (
          Array(itemsPerPage).fill(0).map((_, index) => (
            <GroceryCardSkeleton key={`skeleton-${index}`} />
          ))
        )}
        
        {/* Error state */}
        {error && (
          <div className="col-span-full py-16 text-center">
            <div className="bg-red-50 rounded-lg p-8 max-w-md mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-lg font-medium text-red-800">Unable to load products</h3>
              <p className="mt-2 text-red-700">We&apos;re experiencing technical difficulties. Please try again later.</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Empty state */}
        {products && products.length === 0 && (
          <div className="col-span-full py-16 text-center">
            <div className="bg-blue-50 rounded-lg p-8 max-w-md mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="text-lg font-medium text-blue-800">No products found</h3>
              <p className="mt-2 text-blue-700">There are no products available in this category.</p>
            </div>
          </div>
        )}
        
        {/* Products for current page */}
        {currentProducts.map((product) => (
          <GroceryCard 
            product={product} 
            key={product.id || product._id || `product-${product.slug}`}
          />
        ))}
      </div>
      
      {/* Loading indicator */}
      {isValidating && products && (
        <div className="flex justify-center py-10 mt-6">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
            <p className="mt-3 text-sm text-gray-500">Updating products...</p>
          </div>
        </div>
      )}
      
      {/* Pagination */}
      {products && products.length > 0 && totalPages > 1 && (
        <div className="flex justify-center mt-12 mb-6">
          <nav className="flex items-center bg-white shadow-md rounded-lg px-2">
            {/* Previous button */}
            <button
              onClick={previousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 m-1 rounded-md flex items-center justify-center ${
                currentPage === 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-blue-600 hover:bg-blue-50 hover:text-blue-800'
              }`}
              aria-label="Previous page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Page numbers */}
            {paginationNumbers().map((pageNumber, index) => (
              pageNumber === '...' ? (
                <span key={`ellipsis-${index}`} className="px-4 py-2 text-gray-500">
                  ...
                </span>
              ) : (
                <button
                  key={`page-${pageNumber}`}
                  onClick={() => goToPage(pageNumber)}
                  className={`w-10 h-10 m-1 flex items-center justify-center rounded-md ${
                    currentPage === pageNumber
                      ? 'bg-blue-600 text-white font-medium'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-800'
                  }`}
                >
                  {pageNumber}
                </button>
              )
            ))}
            
            {/* Next button */}
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 m-1 rounded-md flex items-center justify-center ${
                currentPage === totalPages 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-blue-600 hover:bg-blue-50 hover:text-blue-800'
              }`}
              aria-label="Next page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      )}
      
      {/* Showing X of Y results summary */}
      {products && products.length > 0 && (
        <div className="text-center text-sm text-gray-500 mt-6">
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalProducts)} to {Math.min(currentPage * itemsPerPage, totalProducts)} of {totalProducts} products
        </div>
      )}
    </section>
  );
};

export default ProductsSection;