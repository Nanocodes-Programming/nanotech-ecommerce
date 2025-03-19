'use client'
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants/api';
import { calculateTotalPrice } from '../../store/actions/customer_actions';
import { setAuthModal } from '../../store/reducers/auth_reducer';
import { setDashboardPage, resetCartItems } from '../../store/reducers/dashboard_reducer';
import Header from '@/components/Header';
import CartCard from '@/components/utils/cards/CartCard';
import { useRouter } from 'next/navigation';
import NoCart from '@/components/utils/icons/NoCart';

const CartPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.dashboard.cartItems || []);
  const authenticated = useSelector((state) => state.auth.authenticated);

  const url = `${API_URL}/products/`;
  const { data: products } = useSWR(url);

  // Calculate subtotal
  const subtotal = calculateTotalPrice(cartItems, products);
  
  // Format price with commas
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleOrderPage = () => {
    if (authenticated && cartItems?.length) {
      dispatch(setAuthModal('ORDER'));
      dispatch(setDashboardPage('orders'));
      router.push('/dashboard');
    } else if (cartItems?.length <= 0) {
      toast.warning('You have no items in your cart', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
      });
    } else if (!authenticated) {
      dispatch(setAuthModal('LOGIN'));
    }
  };

  const continueShopping = () => {
    router.push('/');
  };

  const handleClearCart = () => {
    if (cartItems?.length > 0) {
      dispatch(resetCartItems());
      toast.success('Cart has been cleared', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
      });
    } else {
      toast.info('Your cart is already empty', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <Header />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          
          {cartItems?.length > 0 && (
            <button 
              onClick={handleClearCart}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md transition-all duration-200 flex items-center gap-2 shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Clear Cart
            </button>
          )}
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                  <span className="mr-2">Cart Items</span>
                  <span className="inline-flex items-center justify-center bg-blue-500 text-white text-sm w-6 h-6 rounded-full">
                    {cartItems?.length || 0}
                  </span>
                </h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {cartItems && cartItems.length > 0 ? (
                  cartItems.map((cartItem, index) => (
                    <div key={`${cartItem.product_id}-${index}`} className="px-6 py-4 transition-colors hover:bg-gray-50">
                      <CartCard cartItem={cartItem} />
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 px-4">
                    <div className="mb-6 text-gray-400">
                      <NoCart />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-3">Your cart is empty</h3>
                    <p className="text-gray-500 mb-8 text-center max-w-md">
                      Looks like you haven&apos;t added any products to your cart yet.
                    </p>
                    <button 
                      onClick={continueShopping}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition-colors shadow-sm"
                    >
                      Continue Shopping
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Order Summary Section */}
          <div className="w-full lg:w-96">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-lg font-medium text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Order Summary
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900 font-medium">₦{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-500 italic">Calculated at checkout</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-medium text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">₦{formatPrice(subtotal)}</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">Delivery fees will be calculated at checkout</p>
                </div>
              </div>
              
              <button
                onClick={handleOrderPage}
                disabled={cartItems?.length === 0}
                className={`w-full mt-6 py-3 px-4 rounded-md font-medium text-white transition-colors shadow-sm ${
                  cartItems?.length === 0 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                Proceed to Checkout
              </button>
              
              <button
                onClick={continueShopping}
                className="w-full mt-3 py-3 px-4 rounded-md font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>
              
              {/* Secure checkout badge */}
              <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;