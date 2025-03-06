import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { API_URL } from '../../../constants/api';
import { setAuthModal } from '../../../store/reducers/auth_reducer';
import {
  setCartItems,
  setItemToRemove,
  setReduceCartItem,
} from '../../../store/reducers/dashboard_reducer';

const styles = {
  btnContainer: 'flex justify-between gap-3 md:gap-5',
  editCount:
    'cursor-pointer font-semibold text-sm md:text-lg px-2 p-1 border border-yellow-400',
  count: 'text-white font-semibold text-sm md:text-lg px-2  py-1 bg-green-700',
  addToCartBtn:
    'flex items-center justify-between bg-green-700 px-2 py-2 rounded-lg text-white font-semibold text-xs md:text-sm gap-2',
};

const CartCard = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { data: itemDetails } = useSWR(`${API_URL}/products/${cartItem?.slug}`);
  // const cartItems = useSelector((state) => state.dashboard.cartItems);

  const addToCart = () => {
    const cartData = {
      product_id: itemDetails?.id,
      quantity: 1,
      price: itemDetails?.discount_price,
      slug: itemDetails?.slug,
    };

    dispatch(setCartItems(cartData));
    toast.success(`Increased item in cart`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
    });
  };

  const reduceFromCart = () => {
    if (cartItem?.quantity > 1) {
      const cartData = {
        product_id: itemDetails?.id,
        price: itemDetails?.discount_price,
        slug: itemDetails?.slug,
      };

      dispatch(setReduceCartItem(cartData));
      toast.success(`Reduced item from cart`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col p-2 border-t">
        <div className="flex items-center justify-between">
          <div className="flex justify-start gap-2">
            <div className="h-12 w-12 overflow-hidden">
              <img src={`${itemDetails?.image}`} alt="cart" />
            </div>
            <div>
              <p className="text-[#0000009e] text-base md:text-lg capitalize">
                {itemDetails?.name}
              </p>
              {itemDetails?.available && (
                <p className="text-gray-500 text-sm md:text-base">In stock</p>
              )}

              {!itemDetails?.available && <p>Out of stock</p>}
            </div>
          </div>
          <div className="flex items-center font-semibold text-[#0000009e]">
            <p className="line-through mr-[2px]">N</p>
            <p>{itemDetails?.discount_price}</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <p
            onClick={() => {
              dispatch(setItemToRemove(cartItem));
              dispatch(setAuthModal('REMOVECART'));
            }}
            className="text-[#f68b1e] text-sm cursor-pointer"
          >
            REMOVE
          </p>

          <div className={styles?.btnContainer}>
            <div className="flex items-center">
              <p
                onClick={reduceFromCart}
                className={`${styles?.editCount} rounded-l-lg select-none`}
              >
                -
              </p>
              <p className={styles?.count}>{cartItem?.quantity}</p>
              <p
                onClick={addToCart}
                className={`${styles?.editCount} text-green-700  rounded-r-lg select-none`}
              >
                +
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
