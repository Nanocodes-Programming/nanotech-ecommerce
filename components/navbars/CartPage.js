'use client'
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants/api';
import { calculateTotalPrice } from '../../store/actions/customer_actions';
import { setAuthModal } from '../../store/reducers/auth_reducer';
import { setDashboardPage } from '../../store/reducers/dashboard_reducer';
import Header from '../Header';
import CartCard from '../utils/cards/CartCard';
import NoCart from '../utils/icons/NoCart';

const CartPage = () => {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.dashboard.cartItems);
  const authenticated = useSelector((state) => state.auth.authenticated);

  const url = `${API_URL}/products/`;
  const { data: products } = useSWR(url);

  const handleOrderPage = () => {
    if (authenticated && cartItems?.length) {
      dispatch(setAuthModal('ORDER'));
      dispatch(setDashboardPage('orders'));
      navigate('/dashboard');
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

  return (
    <div className="min-h-[90vh]">
      <div className="bg-gradient-to-br from-green-800 via-green-500 to-green-600 shadow-md px-3 xl:px-32">
        <Header />
      </div>
      <div className="flex flex-col md:flex-row justify-between px-4 xl:px-40 md:gap-10 lg:gap-20">
        <div className="flex-1 w-full mt-5 shadow-md rounded-md p-2">
          <p className="font-semibold text-lg text-[#0000009e]">{`Cart (${cartItems?.length})`}</p>
          {cartItems?.map((cartItem) => (
            <CartCard cartItem={cartItem} />
          ))}

          {cartItems?.length === 0 && (
            <div className="flex justify-center -mt-28">
              <NoCart />
            </div>
          )}
        </div>
        <div className="w-full md:w-64 h-48 mr-auto ml-auto bg-white rounded-md shadow-md px-2 mt-5">
          <div className="border-b">
            <div className="flex items-center justify-between mt-2 mb-2 pt-3">
              <p className="text-[#0000009e]">Subtotal</p>
              <div className="flex items-center text-[#0000009e] font-semibold text-lg gap-[1px]">
                <p className="line-through">N</p>
                <p className="text-lg">
                  {calculateTotalPrice(cartItems, products)}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[#0000009e] mb-3">Order below</p>
              {/* <p className="mb-2 text-[#0000009e] font-semibold text-lg">---</p> */}
            </div>
          </div>
          <p className="my-2 text-[#0000009e]">
            Delivery fees are not included yet
          </p>
          <div className="w-full flex items-center mb-2">
            <button
              onClick={handleOrderPage}
              className="bg-[#FFB800] w-full text-white font-semibold py-2 px-4 rounded-lg"
            >
              Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
