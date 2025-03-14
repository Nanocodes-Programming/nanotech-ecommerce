'use client'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import useSWR, { mutate } from 'swr';
import { API_URL } from '../../../constants/api';
import { getFavourite } from '../../../store/actions/customer_actions';
import { setAuthModal } from '../../../store/reducers/auth_reducer';
import { setCartItems } from '../../../store/reducers/dashboard_reducer';
import { setProductDetails } from '../../../store/reducers/main_reducer';
import LikeIIcon from '../icons/LikeIIcon';
import LikedIcon from '../icons/LikedIcon';

const CleanProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const user = cookies.get('user');
  const token = cookies.get('token');
  const [isFavourite, setFavourite] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const authenticated = useSelector((state) => state.auth.authenticated);

  // Calculate discount percentage
  const originalPrice = product?.real_price || 0;
  const discountPrice = product?.discount_price || 0;
  const discountPercentage = originalPrice > 0 
    ? Math.round(((originalPrice - discountPrice) / originalPrice) * 100) 
    : 0;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const favouriteUrl = `${API_URL}/favourite`;
  const { data: favourites } = useSWR(favouriteUrl, (url) =>
    fetcher(url, config)
  );

  const addToCart = (e) => {
    e.stopPropagation();
    const cartData = {
      product_id: product?.id,
      quantity: 1,
      price: product?.discount_price,
      slug: product?.slug,
    };

    dispatch(setCartItems(cartData));
    toast.success(`${product?.name} added to cart`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      icon: "🎮",
    });
  };

  const handleFavorite = async (e) => {
    e.stopPropagation();
    try {
      const checkFavorite = getFavourite(favourites, product?.slug, user?.pk);

      if (authenticated) {
        if (!checkFavorite) {
          const res = await axios.post(
            `${API_URL}/favourite/create`,
            {
              product_slug: product?.slug,
            },
            config
          );

          toast.success(`${product?.name} has been added to your favourites`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
          });

          mutate(favouriteUrl, [...favourites, ...res?.data], false);
        }
      } else {
        dispatch(setAuthModal('LOGIN'));
      }
    } catch (err) {
      return err;
    }
  };

  // Check if product is in favorites
  useEffect(() => {
    if (favourites && product) {
      const checkFavorite = getFavourite(favourites, product.slug, user?.pk);
      setFavourite(checkFavorite);
    }
  }, [favourites, product, user]);

  // Gaming theme colors
  const darkBg = '#0B0719';  // Dark blue/purple background
  const accentBlue = '#0066FF'; // Bright blue accent
  const accentPink = '#FF3366'; // Pink accent for discount
  const gradientFrom = '#0066FF'; // Gradient start (blue)
  const gradientTo = '#4D29CC';   // Gradient end (purple)

  return (
    <div 
      className="relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300"
      style={{ 
        width: '280px', 
        backgroundColor: darkBg,
        border: `1px solid rgba(59, 130, 246, 0.2)`,
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => {
        dispatch(setProductDetails(product));
        dispatch(setAuthModal('PRODUCT_DETAILS'));
      }}
    >
      {/* Custom animation for glow effect */}
      <style jsx>{`
        @keyframes glowPulse {
          0% { box-shadow: 0 0 5px rgba(0, 102, 255, 0.3), 0 0 10px rgba(0, 102, 255, 0.2); }
          50% { box-shadow: 0 0 15px rgba(0, 102, 255, 0.5), 0 0 20px rgba(0, 102, 255, 0.4); }
          100% { box-shadow: 0 0 5px rgba(0, 102, 255, 0.3), 0 0 10px rgba(0, 102, 255, 0.2); }
        }

        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        .gaming-card-hover {
          animation: glowPulse 2s infinite;
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

        .scanline-active {
          animation: scanline 2s linear infinite;
        }
      `}</style>
      
      {/* Glow effect container */}
      <div 
        className={`absolute inset-0 rounded-lg transition-all duration-300 ${isHovering ? 'gaming-card-hover' : ''}`}
      ></div>
      
      {/* Scanline effect */}
      <div className={`scanline ${isHovering ? 'scanline-active' : ''}`}></div>
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-500"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-500"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-500"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-500"></div>
      
      {/* Discount badge - always visible */}
      {discountPercentage > 0 && (
        <div 
          className="absolute top-3 left-3 px-3 py-1 rounded-md z-10 text-xs font-bold text-white"
          style={{ 
            background: `linear-gradient(135deg, ${accentPink}, #FF0066)`,
            boxShadow: '0 0 10px rgba(255, 0, 102, 0.5)',
            transform: 'rotate(-5deg)'
          }}
        >
          -{discountPercentage}%
        </div>
      )}
      
      {/* Product image - always visible */}
      <div className="w-full h-64 flex items-center justify-center p-6 relative overflow-hidden">
        <img
          src={`${product?.image}`}
          alt={product?.name || "Product image"}
          className={`max-h-full max-w-full object-contain transition-transform duration-500 ${
            isHovering ? 'scale-110' : 'scale-100'
          }`}
        />
        
        {/* Light scan effect */}
        <div className={`absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/10 to-transparent -translate-y-full transition-transform duration-1500 ${
          isHovering ? 'translate-y-full' : '-translate-y-full'
        }`}></div>
      </div>
      
      {/* Product name and pricing - always visible */}
      <div className="p-4 text-white">
        <h3 className="text-sm font-bold mb-2 truncate">{product?.name}</h3>
        
        {/* Star rating */}
        <div className="flex justify-between items-center">
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-300 text-xs mr-0.5">★</span>
            ))}
            <span className="text-gray-400 text-xs ml-1">({0})</span>
          </div>
          
          {/* Price display */}
          <div>
            {originalPrice > 0 && originalPrice !== discountPrice && (
              <span className="text-xs text-gray-400 line-through mr-2">₦{originalPrice.toLocaleString()}</span>
            )}
            <span className="text-base font-bold text-white">
              ₦{discountPrice.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      
      {/* Action buttons and details - visible on hover */}
      <div 
        className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-blue-900/95 to-transparent transition-opacity duration-300 ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="p-4">
          {/* Quick action buttons */}
          <div className="flex justify-center gap-2 mb-4">
            <button 
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              onClick={handleFavorite}
              aria-label={isFavourite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavourite ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              )}
            </button>
            
            <button 
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
              aria-label="Quick view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            
            <button 
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(e);
              }}
              aria-label="Add to cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
          </div>
          
          {/* Add to cart button (Full width) */}
          <button 
            className="w-full py-2 rounded-md text-white font-medium text-sm mb-3"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(e);
            }}
            style={{
              background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
              boxShadow: '0 0 10px rgba(0, 102, 255, 0.5)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <span className="relative z-10">Add to Cart</span>
            <div 
              className="absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-30 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                transform: 'skewX(-20deg)',
                animation: 'shimmer 2s infinite'
              }}
            ></div>
          </button>
          
          {/* Specs bullets */}
          {(product?.spec1 || product?.spec2) && (
            <div className="mt-1 grid grid-cols-1 gap-1">
              {product?.spec1 && (
                <div className="flex items-center">
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-1"></span>
                  <span className="text-xs text-gray-300 truncate">{product?.spec1}</span>
                </div>
              )}
              {product?.spec2 && (
                <div className="flex items-center">
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-1"></span>
                  <span className="text-xs text-gray-300 truncate">{product?.spec2}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper fetcher function for SWR
const fetcher = async (url, authDetails) => {
  const res = await axios.get(url, authDetails);
  return res.data;
};

export default CleanProductCard;