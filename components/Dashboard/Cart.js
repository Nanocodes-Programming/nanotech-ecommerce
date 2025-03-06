import React from 'react';
import { useSelector } from 'react-redux';
import CartCard from '../utils/cards/CartCard';
import NoCart from '../utils/icons/NoCart';

const Cart = () => {
  const cartItems = useSelector((state) => state.dashboard.cartItems);

  return (
    <div className="w-full lg:w-[65%] flex flex-col py-2 shadow-md rounded-md h-[85vh] overflow-y-scroll no-scrollbar">
      <div className="flex-1 w-full mt-5 p-2">
        <p className="font-semibold text-lg text-[#0000009e]">{`Cart (${cartItems?.length})`}</p>
        {cartItems?.map((cartItem) => (
          <CartCard cartItem={cartItem} />
        ))}
        {cartItems?.length === 0 && (
          <div className="flex justify-center -mt-40">
            <NoCart />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
