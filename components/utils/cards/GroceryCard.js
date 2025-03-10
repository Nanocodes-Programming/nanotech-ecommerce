'use client'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setCartItems } from '../../../store/reducers/dashboard_reducer';
import AddToCartIcon from '../icons/AddToCartIcon';

// Renamed both component and file to match
const GroceryCard = ({ product }) => {
  const dispatch = useDispatch();
  const [cartQty, setCartQty] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

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

  // Inline styles to avoid potential reference issues
  const styles = {
    main: 'flex flex-col justify-between w-full max-w-[15rem] h-[20rem] rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300 p-3 m-1 mb-5 relative group overflow-hidden',
    imageContainer: 'pt-2 px-2 pb-1 flex items-center justify-center h-44 overflow-hidden transition-all duration-300',
    image: 'object-contain h-full w-full transition-all duration-500 group-hover:scale-105',
    contentContainer: 'flex flex-col px-1 transition-all duration-300',
    title: 'text-base font-medium text-gray-800 capitalize line-clamp-2 min-h-[2.5rem] transition-colors duration-300 group-hover:text-blue-700',
    priceContainer: 'flex items-center mt-2 mb-2',
    discountPrice: 'text-lg font-bold text-gray-900',
    originalPrice: 'text-sm text-gray-400 line-through ml-2',
    btnContainer: 'flex justify-between items-center mt-auto',
    quantityWrapper: 'flex items-center gap-1',
    quantityBtn: 'w-8 h-8 flex items-center justify-center text-blue-600 hover:text-blue-800 hover:bg-gray-100 transition-all duration-200 cursor-pointer border border-gray-200 rounded-md',
    quantityDisplay: 'w-8 text-center font-medium text-gray-800 mx-1',
    addToCartBtn: 'flex items-center justify-center bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md text-white font-medium text-sm gap-2 transition-all duration-200 hover:shadow-md',
    stockStatus: 'text-xs font-medium text-right mt-1 text-green-600',
  };

  return (
    <div className={styles.main}>
      {/* Product image - Fixed to safely handle potentially undefined image sources */}
      <div className={styles.imageContainer}>
        {product && product.image ? (
          <img 
            src={product.image}
            alt={nameDisplay || "Tech gadget"} 
            className={styles.image}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Product details */}
      <div className={styles.contentContainer}>
        {/* Product name */}
        <h3 className={styles.title}>
          {nameDisplay}
        </h3>
        
        {/* Price information */}
        <div className={styles.priceContainer}>
          <span className={styles.discountPrice}>₦{getProductProp('discount_price')}</span>
          {product?.original_price && (
            <span className={styles.originalPrice}>₦{getProductProp('original_price')}</span>
          )}
        </div>

        {/* Stock status indicator */}
        <div className={styles.stockStatus}>
          {stockStatus}
        </div>

        {/* Add to cart controls */}
        <div className={styles.btnContainer}>
          <div className={styles.quantityWrapper}>
            {cartQty > 0 && (
              <button 
                onClick={reduceQty} 
                className={styles.quantityBtn}
                aria-label="Decrease quantity"
              >
                −
              </button>
            )}
            
            {cartQty > 0 && (
              <span className={styles.quantityDisplay}>{cartQty}</span>
            )}
            
            <button 
              onClick={increaseQty} 
              className={styles.quantityBtn}
              aria-label="Increase quantity"
              disabled={stockLevel === 0}
            >
              +
            </button>
          </div>

          <button 
            onClick={addToCart} 
            className={styles.addToCartBtn}
            disabled={stockLevel === 0}
            aria-label="Add to cart"
          >
            <AddToCartIcon />
            {cartQty > 0 && <span>Add</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroceryCard;