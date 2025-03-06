'use client';
import { Modal } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useSWR, { mutate } from 'swr';
import { API_URL } from '../constants/api';
import { getFavourite } from '../store/actions/customer_actions';
import { setAuthModal } from '../store/reducers/auth_reducer';
import LikeIIcon from './utils/icons/LikeIIcon';
import LikedIcon from './utils/icons/LikedIcon';

const fetcher = async (url, authDetails) => {
  const res = await axios.get(url, authDetails);
  return res.data;
};

const ProductCardModal = () => {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const user = cookies.get('user');
  const token = cookies.get('token');
  const [isFavourite, setFavourite] = useState();
  const authModal = useSelector((state) => state.auth.authModal);
  const productDetails = useSelector((state) => state.main.productDetails);
  const authenticated = useSelector((state) => state.auth.authenticated);

  const handleClose = () => {
    dispatch(setAuthModal(null));
  };

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const favouriteUrl = `${API_URL}/favourite`;
  const { data: favourites } = useSWR(favouriteUrl, (url) =>
    fetcher(url, config)
  );

  const handleFavorite = async () => {
    try {
      const checkFavorite = getFavourite(
        favourites,
        productDetails?.slug,
        user?.pk
      );

      if (authenticated) {
        if (!checkFavorite) {
          const res = await axios.post(
            `${API_URL}/favourite/create`,
            {
              product_slug: productDetails?.slug,
            },
            config
          );

          toast.success(
            `${productDetails?.name} has been added to your favourite`,
            {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000,
              hideProgressBar: false,
            }
          );

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
    const checkFavorite = getFavourite(
      favourites,
      productDetails?.slug,
      user?.pk
    );
    setFavourite(checkFavorite);
  }, [favourites, productDetails, user]);

  return (
    <Modal
      open={authModal === 'PRODUCT_DETAILS'}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className="h-[100vh] w-[100vw] flex items-center justify-center"
    >
      <div className="flex flex-col justify-between h-[70%] w-[90%] md:h-[65%] md:w-[70%] lg:w-[75%] xl:h-[65%] xl:w-[55%] shadow-lg rounded-xl bg-white border-none outline-none overflow-y-scroll md:overflow-y-hidden no-scrollbar">
        <div className="h-full flex flex-col md:flex-row gap-3">
          <div className="flex my-auto h-[50%] max-h-[60%] w-full md:h-full md:max-h-[100%] md:w-[50%] overflow-hidden md:bg-gradient-to-r md:from-green-600 md:to-yellow-400">
            <img
              src={`${productDetails?.image}`}
              alt="onics"
              className="m-auto h-full max-h-[100%] w-full overflow-hidden object-contain"
            />
          </div>

          <div className="flex flex-col gap-3 py-2 md:py-5 px-3">
            <div className="mb-2 md:mb-10 flex flex-col gap-1 md:gap-2">
              <p className="text-[#0000009e] text-lg md:text-xl font-semibold capitalize">
                {`${productDetails?.name}`}
              </p>
              <div className="flex items-center gap-1">
                <p className="line-through text-[#0000009e] text-base md:text-lg font-medium ">
                  N
                </p>
                <p className="text-[#0000009e] text-base md:text-lg font-medium capitalize">
                  {`${productDetails?.discount_price}`}
                </p>
              </div>
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
            <div>
              <p className="text-[#0000009e] text-lg md:text-2xl font-semibold">
                Description
              </p>
              <p className="text-[#0000009e] text-base md:text-lg font-medium overflow-y-scroll no-scrollbar">
                {productDetails?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductCardModal;
