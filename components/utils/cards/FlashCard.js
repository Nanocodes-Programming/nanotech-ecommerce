'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useSWR, { mutate } from 'swr';
import { API_URL } from '../../../constants/api';
import { getFavourite } from '../../../store/actions/customer_actions';
import { setAuthModal } from '../../../store/reducers/auth_reducer';
import { setCartItems } from '../../../store/reducers/dashboard_reducer';
import { setProductDetails } from '../../../store/reducers/main_reducer';
import LikeIIcon from '../icons/LikeIIcon';
import LikedIcon from '../icons/LikedIcon';
import PlusIcon from '../icons/PlusIcon';

const styles = {
  main: 'flex flex-col justify-between min-w-[15rem] max-w-[15rem] mt-5 mb-3 border-2 bg-gradient-to-r from-green-600 to-yellow-400 p-[1px] rounded-2xl cursor-pointer',
  infoContainer:
    'flex flex-col justify-between h-[5rem] p-2 bg-white rounded-b-2xl',
  price: 'text-sm text-[#00000080] line-through -mb-1 font-semibold',
  netWeightContainer: 'flex items-center justify-between',
  netWeightWrapper: 'flex items-center text-[#00000080] font-semibold',
};

const fetcher = async (url, authDetails) => {
  const res = await axios.get(url, authDetails);
  return res.data;
};

const FlashCard = ({ product }) => {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const user = cookies.get('user');
  const token = cookies.get('token');
  const [isFavourite, setFavourite] = useState();
  const authenticated = useSelector((state) => state.auth.authenticated);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const favouriteUrl = `${API_URL}/favourite`;
  const { data: favourites } = useSWR(favouriteUrl, (url) =>
    fetcher(url, config)
  );

  const addToCart = () => {
    const cartData = {
      product_id: product?.id,
      quantity: 1,
      price: product?.discount_price,
      slug: product?.slug,
    };

    dispatch(setCartItems(cartData));
    toast.success(`${product?.name} added to cart`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
    });
  };

  const handleFavorite = async () => {
    try {
      const checkFavorite = getFavourite(favourites, product?.slug, user?.pk);

      if (authenticated) {
        if (!checkFavorite) {
          const res = await axios.post(
            `${API_URL}/favourite/create`,
            {
              product_slug: product?.slug,
            },
            config
          );

          toast.success(`${product?.name} has been added to your favourite`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
          });

          mutate(favouriteUrl, [...favourites, ...res?.data], false);
        }
      } else {
        dispatch(setAuthModal('LOGIN'));
      }
    } catch (err) {
      // console.log(err);
      return err;
    }
  };

  useEffect(() => {
    const checkFavorite = getFavourite(favourites, product?.slug, user?.pk);
    setFavourite(checkFavorite);
  }, [favourites, product, user]);

  return (
    <div className={styles?.main}>
      <div
        onClick={() => {
          dispatch(setProductDetails(product));
          dispatch(setAuthModal('PRODUCT_DETAILS'));
        }}
        className="mr-auto ml-auto mt-auto mb-auto bg-transparent max-h-44 overflow-hidden"
      >
        <img
          src={`${product?.image}`}
          width={215}
          alt="flash sales"
          className="rounded-t-2xl mt-[1px]"
        />
      </div>
      <div className={styles?.infoContainer}>
        <div className="flex items-center gap-2">
          <p className="text-sm xl:text-base font-semibold capitalize">
            {product?.name?.length > 11
              ? `${product?.name?.slice(0, 12)}...`
              : `${product?.name}`}
          </p>
          <span className={styles?.price}>{`N${product?.real_price}`}</span>
          <div className="cursor-pointer">
            {isFavourite ? (
              <LikedIcon />
            ) : (
              <div onClick={handleFavorite}>
                <LikeIIcon />
              </div>
            )}
          </div>
        </div>

        <div className={styles?.netWeightContainer}>
          <div className={styles?.netWeightWrapper}>
            <span className="line-through">N</span>
            <span>{product?.discount_price}</span>
          </div>
          <div
            onClick={addToCart}
            className="bg-[#ffb800] p-1 rounded-md cursor-pointer"
          >
            <PlusIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
