'use client'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { calculateTotalPrice } from '../../../store/actions/customer_actions';
import { setAuthModal } from '../../../store/reducers/auth_reducer';
import BackArrowIcon from '../icons/BackArrowIcon';

const DebitCardDesign = ({ products }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const authenticated = useSelector((state) => state.auth.authenticated);
  const cartItems = useSelector((state) => state.dashboard.cartItems);

  const setLogin = () => {
    dispatch(setAuthModal('LOGIN'));
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="flex flex-col justify-between space-y-6">
      {/* Card design */}
      <div className="flex flex-col justify-between bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl h-56 px-7 py-5 shadow-lg relative overflow-hidden">
        {/* Card shine effect */}
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent"></div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute right-0 bottom-0 w-40 h-40 rounded-full border-4 border-white/20"></div>
          <div className="absolute left-10 top-10 w-20 h-20 rounded-full border-4 border-white/20"></div>
        </div>
        
        {/* Back arrow */}
        <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full shadow-lg cursor-pointer mr-auto hover:bg-white/30 transition-colors z-10">
          <BackArrowIcon height={20} width={20} />
        </div>

        {/* Card number */}
        <p className="text-xl text-white font-semibold tracking-widest z-10">
          **** **** **** 1234
        </p>
        
        {/* Card details */}
        <div className="flex justify-between items-end z-10">
          <div>
            <p className="font-medium text-white/80 text-xs uppercase">
              CARD ISSUER
            </p>
            <p className="font-semibold text-white text-sm">
              FLUTTER WAVE
            </p>
          </div>
          <div>
            <p className="font-medium text-white/80 text-xs uppercase">EXPIRES</p>
            <p className="font-semibold text-white text-sm">12/32</p>
          </div>
          <div>
            <p className="font-medium text-white/80 text-xs uppercase">CVV</p>
            <p className="font-semibold text-white text-sm">123</p>
          </div>
        </div>
        
        {/* Card chip */}
        <div className="absolute top-5 right-7 w-10 h-7 bg-yellow-300/90 rounded-md z-10"></div>
      </div>
      
      {/* Cart total */}
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <p className="text-gray-700 font-medium">Cart Total</p>
        <div className="flex items-center text-gray-900 font-bold text-lg">
          <span className="text-sm font-normal mr-1">₦</span>
          <p>{formatPrice(calculateTotalPrice(cartItems, products))}</p>
        </div>
      </div>
      
      {/* Checkout button */}
      <button
        onClick={() => {
          if (authenticated) {
            router.push('/cart');
          } else {
            setLogin();
          }
        }}
        className="w-full font-medium text-white py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
      >
        Checkout
      </button>
    </div>
  );
};

export default DebitCardDesign;