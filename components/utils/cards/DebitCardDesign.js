'use client'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { calculateTotalPrice } from '../../../store/actions/customer_actions';
import { setAuthModal } from '../../../store/reducers/auth_reducer';
import BackArrowIcon from '../icons/BackArrowIcon';

const DebitCardDesign = ({ products }) => {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const authenticated = useSelector((state) => state.auth.authenticated);
  const cartItems = useSelector((state) => state.dashboard.cartItems);

  const setLogin = () => {
    dispatch(setAuthModal('LOGIN'));
  };

  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col justify-between bg-green-700 rounded-xl h-52 px-7 py-5">
        <div className="bg-green-600 p-2 rounded-[50%] shadow-lg cursor-pointer mr-auto">
          <BackArrowIcon height={20} width={20} />
        </div>

        <p className="text-xl text-white font-semibold tracking-widest">
          **** **** **** 1234
        </p>
        <div className="flex justify-between">
          <div>
            <p className="font-semibold text-[#ffffffcc] text-sm">
              FLUTTER WAVE
            </p>
          </div>
          <div>
            <p className="font-semibold text-[#ffffffcc] text-sm">EXPRESS</p>
            <p className="font-semibold text-white">12/32</p>
          </div>
          <div>
            <p className="font-semibold text-[#ffffffcc] text-sm">CVV</p>
            <p className="font-semibold text-white">123</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="text-[#0000009e]">Cart Total</p>
        <div className="flex items-center text-[#0000009e] font-semibold text-lg gap-[1px]">
          <p className="line-through">N</p>
          <p>{calculateTotalPrice(cartItems, products)}</p>
        </div>
      </div>
      <button
        onClick={() => {
          if (authenticated) {
            navigate('/cart');
          } else {
            setLogin();
          }
        }}
        className="font-semibold text-white py-1 xl:py-3 rounded-3xl bg-green-700"
      >
        Checkout
      </button>
    </div>
  );
};

export default DebitCardDesign;
