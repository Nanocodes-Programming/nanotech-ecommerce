'use client'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setCartItems } from '../../../store/reducers/dashboard_reducer';
import AddToCartIcon from '../icons/AddToCartIcon';
import Link from 'next/link';

const GroceryCard = ({ product }) => {
  const dispatch = useDispatch();
  const [cartQty, setCartQty] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Safe getter function for product properties
  const getProductProp = (prop) => {
    const value = product?.[prop];
    if (value === null || value === undefined) return '';
    if (typeof value === 'object') return JSON.stringify(value);
    return value;
  };

  // Make sure name is a string
  const nameDisplay = product?.name ? 
    (typeof product.name === 'string' ? product.name : 
     (typeof product.name === 'object' && product.name.name ? product.name.name : 'Tech Gadget')) : 'Tech Gadget';

  // Calculate discount percentage
  const discountPercent = product?.original_price && product?.discount_price 
    ? Math.round(((product.original_price - product.discount_price) / product.original_price) * 100) 
    : null;

  // Stock status logic
  const stockLevel = product?.stock_level || product?.quantity || 10;
  const stockStatus = stockLevel > 5 ? 'In Stock' : stockLevel > 0 ? 'Low Stock' : 'Out of Stock';
  
  // Stock status color
  const stockStatusColor = 
    stockLevel > 5 ? 'text-green-600' : 
    stockLevel > 0 ? 'text-yellow-600' : 
    'text-red-600';

  // Create product URL
  const productUrl = `/products/${product?.slug || product?.id || ''}`;

  const increaseQty = () => {
    if (stockLevel > 0) {
      setCartQty(cartQty + 1);
    }
  };

  const reduceQty = () => {
    const minimumValue = 0;
    setCartQty((prevCount) => Math.max(prevCount - 1, minimumValue));
  };

  const addToCart = () => {
    if (stockLevel === 0) {
      toast.error(`${nameDisplay} is currently out of stock`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }

    const cartData = {
      product_id: product?.id,
      quantity: cartQty || 1, // Default to 1 if quantity is 0
      price: product?.discount_price,
      slug: product?.slug,
    };

    dispatch(setCartItems(cartData));
    
    // Show success animation
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1000);
    
    toast.success(`${nameDisplay} added to cart`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      icon: "🛒",
    });
  };
  
  // Clear add animation after timeout
  useEffect(() => {
    if (isAdded) {
      const timer = setTimeout(() => setIsAdded(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isAdded]);

  return (
    <div 
      className={`flex flex-col justify-between w-full max-w-[15rem] h-[22rem] rounded-xl bg-white overflow-hidden relative group ${
        isAdded ? 'animate-pulse' : ''
      } transition-all duration-300 transform ${
        isHovering ? 'shadow-lg scale-[1.02]' : 'shadow-md scale-100'
      }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Discount badge if applicable */}
      {discountPercent && (
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10 transform -rotate-2">
          -{discountPercent}%
        </div>
      )}
      
      {/* View Details Button */}
      <Link 
        href={productUrl}
        className={`absolute inset-x-0 top-1/3 flex justify-center z-10 transition-opacity duration-300 ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-800 shadow-md">
          View Details
        </span>
      </Link>

      {/* Product image with zoom effect - LARGER */}
      <Link href={productUrl} className="block relative overflow-hidden h-60 bg-gradient-to-br from-gray-50 to-gray-100">
        {product && product.image ? (
          <div className="h-full w-full flex items-center justify-center">
            <img 
              src={product.image}
              alt={nameDisplay || "Tech gadget"} 
              className={`object-contain max-h-full transition-transform duration-700 ${
                isHovering ? 'scale-110' : 'scale-100'
              }`}
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
            No Image
          </div>
        )}
        
        {/* Light shine effect on hover */}
        <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-1000 ${
          isHovering ? 'translate-x-full' : '-translate-x-full'
        }`}></div>
      </Link>

      {/* Product details - SMALLER */}
      <div className="flex flex-col p-3 flex-grow">
        {/* Product name */}
        <Link href={productUrl}>
          <h3 className={`text-sm font-medium capitalize line-clamp-1 transition-colors duration-300 ${
            isHovering ? 'text-blue-700' : 'text-gray-800'
          }`}>
            {nameDisplay}
          </h3>
        </Link>
        
        {/* Price information */}
        <div className="flex items-center mt-1 mb-1">
          <span className="text-base font-bold text-gray-900">₦{getProductProp('discount_price')}</span>
          {product?.original_price && (
            <span className="text-xs text-gray-400 line-through ml-2">₦{getProductProp('original_price')}</span>
          )}
          
          {/* Stock status indicator - Inline */}
          <div className={`text-xs font-medium ml-auto ${stockStatusColor}`}>
            {stockStatus}
          </div>
        </div>

        {/* Add to cart controls */}
        <div className="flex justify-between items-center pt-1">
          <div className="flex items-center gap-1">
            {cartQty > 0 && (
              <button 
                onClick={reduceQty} 
                className="w-7 h-7 flex items-center justify-center text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-all duration-200 cursor-pointer border border-gray-200 rounded-md"
                aria-label="Decrease quantity"
              >
                −
              </button>
            )}
            
            {cartQty > 0 && (
              <span className="w-6 text-center font-medium text-gray-800">{cartQty}</span>
            )}
            
            <button 
              onClick={increaseQty} 
              className="w-7 h-7 flex items-center justify-center text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-all duration-200 cursor-pointer border border-gray-200 rounded-md"
              aria-label="Increase quantity"
              disabled={stockLevel === 0}
            >
              +
            </button>
          </div>

          <button 
            onClick={addToCart} 
            className={`flex items-center justify-center px-3 py-1.5 rounded-md text-white font-medium text-xs gap-1 transition-all duration-200 hover:shadow-md ${
              isAdded ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={stockLevel === 0}
            aria-label="Add to cart"
          >
            <AddToCartIcon />
            {cartQty > 0 && <span>Add</span>}
            {isAdded && <span>✓</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroceryCard;