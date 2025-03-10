'use client';
import { Modal } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useSWR, { mutate } from 'swr';
import { API_URL } from '../constants/api';
import { getFavourite } from '../store/actions/customer_actions';
import { setAuthModal } from '../store/reducers/auth_reducer';
import { setCartItems } from '../store/reducers/dashboard_reducer';
import LikeIIcon from './utils/icons/LikeIIcon';
import LikedIcon from './utils/icons/LikedIcon';

const fetcher = async (url, authDetails) => {
  const res = await axios.get(url, authDetails);
  return res.data;
};

const ProductCardModal = () => {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const user = cookies.get('user');
  const token = cookies.get('token');
  const [isFavourite, setFavourite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const authModal = useSelector((state) => state.auth.authModal);
  const productDetails = useSelector((state) => state.main.productDetails);
  const authenticated = useSelector((state) => state.auth.authenticated);

  // Calculate discount percentage if available
  const discountPercent = productDetails?.original_price && productDetails?.discount_price 
    ? Math.round(((productDetails.original_price - productDetails.discount_price) / productDetails.original_price) * 100) 
    : null;

  const handleClose = () => {
    dispatch(setAuthModal(null));
    // Reset state when modal closes
    setQuantity(1);
    setSelectedImage(0);
  };

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const favouriteUrl = `${API_URL}/favourite`;
  const { data: favourites } = useSWR(
    authenticated ? favouriteUrl : null, 
    (url) => fetcher(url, config)
  );

  const handleFavorite = async () => {
    try {
      if (!authenticated) {
        dispatch(setAuthModal('LOGIN'));
        return;
      }

      const checkFavorite = getFavourite(
        favourites,
        productDetails?.slug,
        user?.pk
      );

      if (!checkFavorite) {
        const res = await axios.post(
          `${API_URL}/favourite/create`,
          {
            product_slug: productDetails?.slug,
          },
          config
        );

        toast.success(
          `${productDetails?.name} has been added to your favourites`,
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
          }
        );

        mutate(favouriteUrl, [...favourites, ...res?.data], false);
      }
    } catch (err) {
      toast.error('Unable to add to favourites. Please try again.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return err;
    }
  };

  // Add to cart functionality
  const handleAddToCart = () => {
    if (!productDetails) return;
    
    setIsAddingToCart(true);

    const cartData = {
      product_id: productDetails.id,
      quantity: quantity,
      price: productDetails.discount_price,
      slug: productDetails.slug,
    };

    dispatch(setCartItems(cartData));
    
    toast.success(`${productDetails.name} added to cart`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      hideProgressBar: false,
      icon: "🛒",
    });

    // Reset adding state after animation
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

  // Handle quantity changes
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Process product images
  const productImages = productDetails?.images && Array.isArray(productDetails.images) && productDetails.images.length > 0
    ? productDetails.images
    : productDetails?.image ? [productDetails.image] : [];

  useEffect(() => {
    const checkFavorite = getFavourite(
      favourites,
      productDetails?.slug,
      user?.pk
    );
    setFavourite(checkFavorite);
  }, [favourites, productDetails, user]);

  if (!productDetails) return null;

  return (
    <Modal
      open={authModal === 'PRODUCT_DETAILS'}
      onClose={handleClose}
      aria-labelledby="product-details-modal"
      aria-describedby="detailed view of product"
      className="h-[100vh] w-[100vw] flex items-center justify-center"
    >
      <div className="flex flex-col h-[80%] w-[90%] md:h-[80%] md:w-[80%] lg:max-w-5xl shadow-2xl rounded-xl bg-white border-none outline-none overflow-hidden">
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-50 p-1 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 hover:bg-white hover:text-gray-900 transition-colors"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="h-full flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {/* Left side - Product images */}
          <div className="flex flex-col md:w-[55%] h-[40%] md:h-full">
            <div className="relative flex items-center justify-center h-full bg-gradient-to-br from-gray-50 to-gray-100 p-6">
              {/* Discount badge */}
              {discountPercent && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-md z-10">
                  -{discountPercent}% OFF
                </div>
              )}
              
              {/* Main product image */}
              {productImages.length > 0 ? (
                <img
                  src={productImages[selectedImage]}
                  alt={productDetails.name}
                  className="w-full h-full object-contain transition-all duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                  No Image Available
                </div>
              )}
              
              {/* Favorite button */}
              <button 
                onClick={handleFavorite}
                className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300"
              >
                {isFavourite ? <LikedIcon /> : <LikeIIcon />}
              </button>
            </div>
            
            {/* Thumbnail gallery */}
            {productImages.length > 1 && (
              <div className="flex justify-center gap-2 p-3 bg-white border-t border-gray-100">
                {productImages.map((img, index) => (
                  <button 
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`h-16 w-16 rounded-md overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-blue-600 shadow-sm scale-105' 
                        : 'border-transparent hover:border-gray-300'
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img 
                      src={img} 
                      alt={`${productDetails.name} view ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Right side - Product details */}
          <div className="md:w-[45%] h-[60%] md:h-full p-6 overflow-y-auto">
            <div className="flex flex-col h-full">
              {/* Product title and price */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 capitalize mb-2">
                  {productDetails.name}
                </h2>
                
                <div className="flex items-baseline mt-2">
                  <span className="text-2xl font-bold text-blue-600">
                    ₦{productDetails.discount_price}
                  </span>
                  {productDetails.original_price && (
                    <span className="ml-3 text-lg text-gray-400 line-through">
                      ₦{productDetails.original_price}
                    </span>
                  )}
                </div>
                
                {/* Product ID/SKU */}
                {productDetails.id && (
                  <div className="mt-2 text-sm text-gray-500">
                    SKU: {typeof productDetails.id === 'string' 
                      ? productDetails.id.substring(0, 8) 
                      : productDetails.id
                    }
                  </div>
                )}
              </div>
              
              {/* Description */}
              <div className="mb-6 flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Description
                </h3>
                <div className="text-gray-600 text-sm md:text-base space-y-2">
                  {productDetails.description || 'No description available for this product.'}
                </div>
                
                {/* Category info */}
                {productDetails.category && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-sm font-medium text-gray-700">Category: </span>
                    <span className="text-sm text-gray-600 capitalize">
                      {typeof productDetails.category === 'string' 
                        ? productDetails.category 
                        : (productDetails.category.name || '')
                      }
                    </span>
                  </div>
                )}
              </div>
              
              {/* Add to cart section */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-medium text-gray-700">Quantity:</div>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button 
                      onClick={decreaseQuantity} 
                      className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors rounded-l-md"
                      disabled={quantity <= 1}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    
                    <button 
                      onClick={increaseQuantity} 
                      className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors rounded-r-md"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  className={`w-full py-3 px-6 rounded-lg font-bold text-white flex items-center justify-center gap-2 transition-all ${
                    isAddingToCart 
                      ? 'bg-green-600' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {isAddingToCart ? 'Added to Cart!' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductCardModal;