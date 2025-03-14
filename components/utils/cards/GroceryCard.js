'use client'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setCartItems } from '../../../store/reducers/dashboard_reducer';
import { setProductDetails } from '../../../store/reducers/main_reducer';
import { setAuthModal } from '../../../store/reducers/auth_reducer';

const GamingProductCard = ({ product }) => {
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


// Mobile touch behavior
const [isTouched, setIsTouched] = useState(false);
      
const handleTouchStart = () => {
  setIsTouched(true);
  setIsHovering(true);
};

useEffect(() => {
  if (isTouched) {
    const timer = setTimeout(() => {
      setIsTouched(false);
      setIsHovering(false);
    }, 3000); // Hide overlay after 3 seconds
    
    return () => clearTimeout(timer);
  }
}, [isTouched]);
// Make sure name is a string
const nameDisplay = product?.name ? 
(typeof product.name === 'string' ? product.name : 
(typeof product.name === 'object' && product.name.name ? product.name.name : 'Gaming Gear')) : 'Gaming Gear';

// Calculate discount percentage
const discountPercent = product?.original_price && product?.discount_price 
? Math.round(((product.original_price - product.discount_price) / product.original_price) * 100) 
: null;

// Stock status logic
const stockLevel = product?.stock_level || product?.quantity || 10;
const stockStatus = stockLevel > 5 ? 'In Stock' : stockLevel > 0 ? 'Low Stock' : 'Out of Stock';

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
icon: "🎮",
});
};

// Clear add animation after timeout
useEffect(() => {
if (isAdded) {
const timer = setTimeout(() => setIsAdded(false), 1000);
return () => clearTimeout(timer);
}
}, [isAdded]);

// Handle showing product details in existing modal
const handleShowDetails = () => {
dispatch(setProductDetails(product));
dispatch(setAuthModal('PRODUCT_DETAILS'));
};

// Add gaming-themed CSS
useEffect(() => {
const style = document.createElement('style');
style.textContent = `
@keyframes glowPulse {
  0% { box-shadow: 0 0 5px rgba(0, 102, 255, 0.3), 0 0 10px rgba(0, 102, 255, 0.2); }
  50% { box-shadow: 0 0 15px rgba(0, 102, 255, 0.5), 0 0 20px rgba(0, 102, 255, 0.4); }
  100% { box-shadow: 0 0 5px rgba(0, 102, 255, 0.3), 0 0 10px rgba(0, 102, 255, 0.2); }
}

@keyframes scanline {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

@keyframes borderFlicker {
  0% { border-color: rgba(0, 102, 255, 0.5); }
  25% { border-color: rgba(0, 102, 255, 0.8); }
  50% { border-color: rgba(0, 102, 255, 0.3); }
  75% { border-color: rgba(0, 102, 255, 0.7); }
  100% { border-color: rgba(0, 102, 255, 0.5); }
}

@keyframes slideUpReveal {
  0% { transform: translateY(100%); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes buttonGlow {
  0% { box-shadow: 0 0 5px rgba(0, 102, 255, 0.5); }
  50% { box-shadow: 0 0 15px rgba(0, 102, 255, 0.8), 0 0 20px rgba(0, 102, 255, 0.4); }
  100% { box-shadow: 0 0 5px rgba(0, 102, 255, 0.5); }
}

.gaming-card {
  position: relative;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background: #111827;
  border: 1px solid #374151;
}

.gaming-card:hover {
  transform: translateY(-3px) scale(1.01);
  animation: glowPulse 2s infinite;
  border-color: #0066FF;
  box-shadow: 0 0 25px rgba(0, 102, 255, 0.5);
}

@media (min-width: 640px) {
  .gaming-card:hover {
    transform: translateY(-5px) scale(1.02);
  }
}

.gaming-card-active-border {
  animation: borderFlicker 2s infinite;
}

.scanline {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10px;
  background: linear-gradient(to bottom, 
    rgba(0, 102, 255, 0) 0%,
    rgba(0, 102, 255, 0.3) 50%,
    rgba(0, 102, 255, 0) 100%);
  opacity: 0.5;
  z-index: 2;
  pointer-events: none;
}

.gaming-card:hover .scanline {
  animation: scanline 2s linear infinite;
}

.product-details-overlay {
  background: linear-gradient(to bottom, rgba(17, 24, 39, 0.95), rgba(0, 102, 255, 0.8));
  backdrop-filter: blur(4px);
}

@media (min-width: 640px) {
  .product-details-overlay {
    background: linear-gradient(to bottom, rgba(17, 24, 39, 0.9), rgba(0, 102, 255, 0.7));
  }
}

.glow-button {
  position: relative;
  overflow: hidden;
  background: linear-gradient(to right, #0066FF, #4D29CC);
  border: none;
  box-shadow: 0 0 10px rgba(0, 102, 255, 0.5);
  transition: all 0.3s ease;
}

.glow-button:hover {
  animation: buttonGlow 1.5s infinite;
  transform: scale(1.05);
}

.glow-button::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(to right, 
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0) 100%);
  transform: rotate(45deg);
  animation: shimmer 2s infinite;
  pointer-events: none;
}

@keyframes shimmer {
  0% { transform: translateX(-100%) rotate(45deg); }
  100% { transform: translateX(100%) rotate(45deg); }
}

.discount-badge {
  background: linear-gradient(135deg, #FF3366, #FF0066);
  box-shadow: 0 0 10px rgba(255, 0, 102, 0.5);
  transform: rotate(-5deg);
}
`;
document.head.appendChild(style);

return () => {
document.head.removeChild(style);
};
}, []);

return (
<div 
className="gaming-card w-full sm:w-64 h-[280px] sm:h-[360px] rounded-lg overflow-hidden relative cursor-pointer bg-gray-900 transition-all duration-300"
onMouseEnter={() => setIsHovering(true)}
onMouseLeave={() => setIsHovering(false)}
onTouchStart={handleTouchStart}
onClick={handleShowDetails}
>
{/* Scanline effect */}
<div className="scanline"></div>

{/* Corner accents - smaller on mobile */}
<div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-blue-500"></div>
<div className="absolute top-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-blue-500"></div>
<div className="absolute bottom-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-blue-500"></div>
<div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-blue-500"></div>

{/* Discount badge - smaller on mobile */}
{discountPercent && (
  <div className="discount-badge absolute top-2 sm:top-3 left-2 sm:left-3 px-2 sm:px-3 py-0.5 sm:py-1 rounded-md z-10 text-xs font-bold text-white">
    -{discountPercent}%
  </div>
)}

{/* Product image - Now takes full card height */}
<div className="absolute inset-0 flex items-center justify-center overflow-hidden">
  {product && product.image ? (
    <img 
      src={product.image}
      alt={nameDisplay || "Gaming product"} 
      className={`object-contain w-full h-full p-4 sm:p-6 transition-transform duration-500 ${
        isHovering ? 'scale-110' : 'scale-100'
      }`}
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-400">
      No Image
    </div>
  )}
  
  {/* Light scan effect */}
  <div className={`absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/10 to-transparent -translate-y-full transition-transform duration-1500 ${
    isHovering ? 'translate-y-full' : '-translate-y-full'
  }`}></div>
</div>

{/* Product info overlay - only visible on hover */}
{/* Product name and pricing (always visible) */}
<div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 flex flex-col bg-gray-900/80 backdrop-blur-sm">
  <h3 className="text-white font-bold text-sm sm:text-lg truncate mb-0.5 sm:mb-1">{nameDisplay}</h3>
  <div className="flex items-center">
    <span className="text-sm sm:text-base font-bold text-white">₦{getProductProp('discount_price')}</span>
    {product?.original_price && (
      <span className="text-xs text-gray-300 line-through ml-2">₦{getProductProp('original_price')}</span>
    )}
    <div className="ml-auto flex">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-yellow-400 text-xs">★</span>
      ))}
    </div>
  </div>
</div>

{/* Details overlay - only visible on hover */}
<div 
  className={`product-details-overlay absolute inset-0 flex flex-col justify-center items-center gap-2 p-4 transition-opacity duration-300 ${
    isHovering || isTouched ? 'opacity-100' : 'opacity-0'
  }`}
  onClick={(e) => e.stopPropagation()}
>
  <div className="flex flex-col items-center gap-2 sm:gap-3 w-full transition-all duration-300">
    {/* Action buttons - smaller on mobile */}
    <div className="flex gap-1 sm:gap-2">
      <button 
        className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          // Wishlist functionality
        }}
        aria-label="Add to wishlist"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      </button>
      
      <button 
        className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          // Quick view
        }}
        aria-label="Quick view"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
        </svg>
      </button>
      
      <button 
        className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          // Compare
        }}
        aria-label="Compare"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
        </svg>
      </button>
      
      <button 
        className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          addToCart();
        }}
        aria-label="Add to cart"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
        </svg>
      </button>
    </div>
    
    {/* Quick buy button - smaller text on mobile */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleShowDetails();
      }}
      className="glow-button w-full py-1.5 sm:py-2 rounded-md text-white font-medium text-xs sm:text-sm"
    >
      Quick Buy
    </button>
  </div>
</div>
</div>
);
};

export default GamingProductCard;