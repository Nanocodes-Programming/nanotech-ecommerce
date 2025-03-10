'use client'
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants/api';
import { calculateTotalPrice } from '../../store/actions/customer_actions';
import { setAuthModal } from '../../store/reducers/auth_reducer';
import { setDashboardPage } from '../../store/reducers/dashboard_reducer';
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-green-800 via-green-500 to-green-600 shadow-md px-3 xl:px-32">
        <Header />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Cart Items ({cartItems?.length || 0})
                </h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {cartItems && cartItems.length > 0 ? (
                  cartItems.map((cartItem, index) => (
                    <div key={`${cartItem.product_id}-${index}`} className="px-6 py-4">
                      <CartCard cartItem={cartItem} />
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="mb-4">
                      <NoCart />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                    <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
                    <button 
                      onClick={continueShopping}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Order Summary Section */}
          <div className="w-full lg:w-80">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
              
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
                className={`w-full mt-6 py-3 px-4 rounded-md font-medium text-white transition-colors ${
                  cartItems?.length === 0 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#FFB800] hover:bg-[#e6a600]'
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;