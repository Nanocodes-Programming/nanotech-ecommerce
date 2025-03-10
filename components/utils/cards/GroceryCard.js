'use client'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setCartItems } from '../../../store/reducers/dashboard_reducer';
import AddToCartIcon from '../icons/AddToCartIcon';

const styles = {
  main: 'flex flex-col justify-between max-w-[14rem] min-w-[10rem] h-[20rem] rounded-3xl bg-white shadow-md p-1 m-1 mb-5',
  title: 'text-xl text-center font-normal ml-auto mr-auto capitalize',
  price:
    'flex items-center text-[#0000009e] text-lg ml-auto mr-auto mt-7 md:mt-4',
  btnContainer: 'flex justify-between px-3 mt-12 md:mt-5 gap-1',
  editCount:
    'cursor-pointer font-semibold text-sm md:text-lg px-2 p-1 border border-yellow-400',
  count: 'text-white font-semibold text-sm md:text-lg px-2  py-1 bg-green-700',
  addToCartBtn:
    'flex items-center justify-between bg-green-700 px-2 py-2 rounded-lg text-white font-semibold text-xs md:text-sm gap-2 w-[3.5rem]',
};

const GroceryCard = ({ product }) => {
  const dispatch = useDispatch();
  const [cartQty, setCartQty] = useState(0);

  const increaseQty = () => {
    if (product?.available) {
      setCartQty(cartQty + 1);
    }
  };

  const reduceQty = () => {
    const minimumValue = 0;
    setCartQty((prevCount) => Math.max(prevCount - 1, minimumValue));
  };

  const addToCart = () => {
    const cartData = {
      product_id: product?.id,
      quantity: cartQty,
      price: product?.discount_price,
      slug: product?.slug,
    };

    if (cartQty > 0) {
      dispatch(setCartItems(cartData));
      toast.success(`${product?.name} added to cart`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  return (
    <div className={styles?.main}>
      <div className="pt-10 pl-10 pr-10 pb-0 rounded-md max-h-44 overflow-hidden">
        <img src={`${product?.image}`} alt="grocery" width={150} />
      </div>
      <div className="flex flex-col mb-3">
        <p className={styles?.title}>
          {product?.name?.length > 30
            ? `${product?.name?.slice(0, 29)}...`
            : `${product?.name}`}
        </p>
        <div className={styles?.price}>
          <span className="line-through">N</span>
          <span className="">{product?.discount_price}</span>
        </div>
        <div className={styles?.btnContainer}>
          <div className="flex items-center">
            <p
              onClick={reduceQty}
              className={`${styles?.editCount} rounded-l-lg select-none`}
            >
              -
            </p>
            <p className={styles?.count}>{cartQty}</p>
            <p
              onClick={increaseQty}
              className={`${styles?.editCount} text-green-700  rounded-r-lg select-none`}
            >
              +
            </p>
          </div>

          <button onClick={addToCart} className={styles?.addToCartBtn}>
            <div className="inline-block mx-auto">
              <AddToCartIcon />
            </div>
            {/* <p>Add to cart</p> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroceryCard;
