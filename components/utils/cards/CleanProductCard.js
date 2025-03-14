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

  // Colors based on the requested scheme
  const primaryBlue = '#0066FF';   // Blue
  const grayBorder = '#E0E0E0';    // Gray border
  const shadowColor = 'rgba(74, 0, 99, 0.2)'; // Purple-blue shadow with transparency

  return (
    <div 
      className="group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300"
      style={{ 
        width: '280px', 
        backgroundColor: 'white',
        border: `1px solid ${grayBorder}`,
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease'
      }}
      onClick={() => {
        dispatch(setProductDetails(product));
        dispatch(setAuthModal('PRODUCT_DETAILS'));
      }}
    >
      <div 
        className="group-hover:shadow-xl transition-shadow duration-300" 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          borderRadius: '0.5rem',
          boxShadow: `0 10px 25px ${shadowColor}` 
        }}
      ></div>
      
      {/* Discount badge - always visible */}
      {discountPercentage > 0 && (
        <div 
          className="absolute top-3 left-3 px-3 py-1.5 rounded-full z-10 shadow-md text-xs font-bold"
          style={{ 
            background: primaryBlue,
            color: 'white'
          }}
        >
          -{discountPercentage}%
        </div>
      )}
      
      {/* Product image - always visible */}
      <div className="w-full h-64 flex items-center justify-center p-4">
        <img
          src={`${product?.image}`}
          alt={product?.name || "Product image"}
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      {/* Action buttons - appear on hover */}
      <div className="absolute top-0 right-0 pt-3 pr-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
        <button 
          className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors transform hover:scale-110 active:scale-95"
          onClick={handleFavorite}
          aria-label={isFavourite ? "Remove from favorites" : "Add to favorites"}
          style={{ boxShadow: '0 3px 10px rgba(0,0,0,0.1)' }}
        >
          {isFavourite ? <LikedIcon /> : <LikeIIcon />}
        </button>
        
        <button 
          className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors transform hover:scale-110 active:scale-95"
          onClick={(e) => e.stopPropagation()}
          aria-label="Quick view"
          style={{ boxShadow: '0 3px 10px rgba(0,0,0,0.1)' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </button>
      </div>
      
      {/* Info panel that slides up from bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
        style={{ 
          background: primaryBlue,
          borderTopLeftRadius: '12px', 
          borderTopRightRadius: '12px'
        }}
      >
        <div className="p-4 text-white">
          <div className="flex justify-between items-start">
            <div className="flex-1 mr-2">
              <h3 className="text-sm font-medium mb-2 truncate">{product?.name}</h3>
              
              {/* Star rating */}
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-300 mr-0.5">★</span>
                ))}
                <span className="text-white text-xs ml-1 opacity-80">({0})</span>
              </div>
            </div>
            
            {/* Add to cart button */}
            <button 
              className="flex-shrink-0 p-2 rounded-full shadow-md transform hover:scale-110 active:scale-95 transition-all"
              onClick={addToCart}
              aria-label="Add to cart"
              style={{ backgroundColor: 'white', color: primaryBlue }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </button>
          </div>
          
          {/* Price display */}
          <div className="mt-1">
            {originalPrice > 0 && originalPrice !== discountPrice && (
              <span className="text-xs text-gray-200 line-through mr-2 opacity-80">₦{originalPrice.toLocaleString()}</span>
            )}
            <span className="text-base font-bold text-white">
              ₦{discountPrice.toLocaleString()}
            </span>
          </div>
          
          {/* Specs bullets - optional, include if there's space */}
          <div className="mt-2 pt-2 border-t border-white border-opacity-20">
            <div className="text-xs opacity-90 grid grid-cols-2 gap-1">
              {product?.spec1 && (
                <div className="flex items-center">
                  <span className="mr-1 opacity-70">•</span>
                  <span className="truncate">{product?.spec1}</span>
                </div>
              )}
              {product?.spec2 && (
                <div className="flex items-center">
                  <span className="mr-1 opacity-70">•</span>
                  <span className="truncate">{product?.spec2}</span>
                </div>
              )}
            </div>
          </div>
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