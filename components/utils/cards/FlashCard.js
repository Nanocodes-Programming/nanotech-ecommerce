'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useSWR, { mutate } from 'swr';
import { API_URL } from '../../../constants/api';
import { getFavourite } from '../../../store/actions/customer_actions';
import { setAuthModal } from '../../../store/reducers/auth_reducer';
import { setCartItems } from '../../../store/reducers/dashboard_reducer';
import { setProductDetails } from '../../../store/reducers/main_reducer';
import LikeIIcon from '../icons/LikeIIcon';
import LikedIcon from '../icons/LikedIcon';

const styles = {
  main: 'group flex flex-col justify-between w-60 rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-cardFadeIn',
  imageContainer: 'relative w-full h-44 bg-white p-2 flex items-center justify-center overflow-hidden',
  productImage: 'max-h-40 max-w-full object-contain transition-transform duration-500 group-hover:scale-105 animate-imageReveal',
  discountBadge: 'absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-md animate-badgePulse z-10',
  favoriteButton: 'absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-sm hover:shadow-md transition-all transform hover:scale-110 active:scale-95',
  infoContainer: 'flex flex-col p-3 border-t border-gray-100 animate-contentSlideUp',
  productName: 'text-sm font-medium text-gray-800 mb-1 line-clamp-1',
  spacer: 'h-1',
  priceSection: 'flex justify-between items-end mt-1',
  priceContainer: 'flex flex-col',
  originalPrice: 'text-xs text-gray-400 line-through font-medium',
  discountPrice: 'text-sm font-bold text-blue-600',
  addButton: 'bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors',
  stockLabel: 'text-xs font-medium text-green-600 mt-1',
};

const fetcher = async (url, authDetails) => {
  const res = await axios.get(url, authDetails);
  return res.data;
};

const FlashCard = ({ product }) => {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const user = cookies.get('user');
  const token = cookies.get('token');
  const [loaded, setLoaded] = useState(false);
  const [isFavourite, setFavourite] = useState();
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

  useEffect(() => {
    // Trigger animations after component mounts
    setLoaded(true);
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes cardFadeIn {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes imageReveal {
        0% { opacity: 0; transform: scale(0.8); }
        100% { opacity: 1; transform: scale(1); }
      }
      
      @keyframes contentSlideUp {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes badgePulse {
        0% { opacity: 0; transform: scale(0.8); }
        70% { opacity: 1; transform: scale(1.1); }
        100% { opacity: 1; transform: scale(1); }
      }
      
      @keyframes pricePulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      
      @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
      
      .animate-cardFadeIn {
        animation: cardFadeIn 0.5s ease-out forwards;
      }
      
      .animate-imageReveal {
        animation: imageReveal 0.7s ease-out forwards;
      }
      
      .animate-contentSlideUp {
        animation: contentSlideUp 0.5s ease-out forwards;
        animation-delay: 0.2s;
        opacity: 0;
        animation-fill-mode: forwards;
      }
      
      .animate-badgePulse {
        animation: badgePulse 0.5s ease-out forwards;
        animation-delay: 0.4s;
        opacity: 0;
        animation-fill-mode: forwards;
      }
      
      .animate-pricePulse {
        animation: pricePulse 2s ease-in-out infinite;
        animation-delay: 0.6s;
      }
      
      .animate-fadeIn {
        animation: fadeIn 0.5s ease-out forwards;
        animation-delay: 0.7s;
        opacity: 0;
        animation-fill-mode: forwards;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Check if product is in favorites
  useEffect(() => {
    const checkFavorite = getFavourite(favourites, product?.slug, user?.pk);
    setFavourite(checkFavorite);
  }, [favourites, product, user]);

  return (
    <div 
      className={styles.main}
      onClick={() => {
        dispatch(setProductDetails(product));
        dispatch(setAuthModal('PRODUCT_DETAILS'));
      }}
    >
      {/* Image section */}
      <div className={styles.imageContainer}>
        {discountPercentage > 0 && (
          <div className={styles.discountBadge}>-{discountPercentage}%</div>
        )}
        <button 
          className={styles.favoriteButton}
          onClick={handleFavorite}
          aria-label={isFavourite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavourite ? <LikedIcon /> : <LikeIIcon />}
        </button>
        <img
          src={`${product?.image}`}
          alt={product?.name || "Product image"}
          className={styles.productImage}
        />
      </div>
      
      {/* Info section */}
      <div className={styles.infoContainer}>
        <h3 className={styles.productName}>{product?.name}</h3>
        
        <div className={styles.spacer}></div>
        
        <div className={styles.priceSection}>
          <div className={styles.priceContainer}>
            {originalPrice > 0 && (
              <span className={styles.originalPrice}>₦{originalPrice.toLocaleString()}</span>
            )}
            <span className={styles.discountPrice}>₦{discountPrice.toLocaleString()}</span>
          </div>
          
          <button 
            className={styles.addButton}
            onClick={addToCart}
            aria-label="Add to cart"
          >
            Add to Cart
          </button>
        </div>
        
        <p className={styles.stockLabel}>In Stock</p>
      </div>
    </div>
  );
};

export default FlashCard;