'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import axios from 'axios';

import { Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { API_URL } from '../../constants/api';
import { setAuthModal } from '../../store/reducers/auth_reducer';
import { resetCartItems } from '../../store/reducers/dashboard_reducer';
import { setOrderID } from '../../store/reducers/payment_reducer';
import CloseIcon from '../utils/icons/CloseIcon';
import LoadingIcon from '../utils/icons/LoadingIcon';
import Button from '../utils/reusables/Button';
import InputField from '../utils/reusables/InputField';
import addressSvg from '../utils/svgs/marker-svgrepo.svg';

const schema = yup.object().shape({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  email: yup.string().required('Email is required').email('Email is not valid'),
  address: yup.string().required('Address is required'),
  postal_code: yup.string().required('Postal code is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  phone_number: yup.string().required('Phone number is required'),
});

const fetcher = async (url, authDetails) => {
  const res = await axios.get(url, authDetails);
  return res.data;
};

const NewOrder = () => {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderError, setOrderError] = useState();
  const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(null);
  const authModal = useSelector((state) => state.auth.authModal);
  const authenticated = useSelector((state) => state.auth.authenticated);
  //   const isLoginLoading = useSelector((state) => state.auth.isLoginLoading);
  const cartItems = useSelector((state) => state.dashboard.cartItems);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const orderUrl = `${API_URL}/order/`;
  const { data: orderedItems } = useSWR(orderUrl, (url) =>
    fetcher(url, config)
  );

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    criteriaMode: 'all',
    reValidateMode: 'onSubmit',
    mode: 'onChange',
  });

  const handleClose = () => {
    // reset();
    dispatch(setAuthModal(null));
  };

  const onSubmit = async (data) => {
    const reqData = {
      cart: cartItems,
      first_name: data?.first_name,
      last_name: data?.last_name,
      email: data?.email,
      address: data?.address,
      postal_code: data?.postal_code,
      city: data?.city,
      state: data?.state,
      phone_number: data?.phone_number,
    };

    // console.log(reqData);
    setIsOrdering(true);

    try {
      if (authenticated) {
        if (cartItems?.length > 0) {
          const res = await axios.post(
            `${API_URL}/order/create`,
            reqData,
            config
          );

          // dispatch(setOrdersArray(res?.data));
          dispatch(resetCartItems());

          const response = await axios.post(
            `${API_URL}/payment/paystack/${res?.data?.order_id}`,
            {},
            config
          );

          toast.success('Order completed, redirecting to payment', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
          });

          if (response?.status === 200) {
            dispatch(
              setOrderID({
                orderId: res?.data?.order_id,
                ref: response?.data?.data?.payment_response?.data?.reference,
              })
            );

            window.open(
              response?.data?.data?.payment_response?.data?.authorization_url,
              '_self'
            );
          }

          setIsOrdering(false);
          reset();
          handleClose();
        } else {
          setIsOrdering(false);
          setOrderError('Your cart is empty');
          setTimeout(() => {
            setOrderError(null);
          }, 20000);
        }
      } else {
        setIsOrdering(false);
        dispatch(setAuthModal('LOGIN'));
      }
    } catch (err) {
      setIsOrdering(false);
      console.log(err);
      setOrderError('Something went wrong');
      setTimeout(() => {
        setOrderError(null);
      }, 20000);
      return err;
    }
  };

  const updateAddress = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      );

      setValue('address', response?.data?.results[0]?.formatted_address);
    } catch (error) {
      setOrderError('Cannot get your location, update manually');
      setTimeout(() => {
        setOrderError(null);
      }, 20000);
    }
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      const geoId = navigator.geolocation.watchPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        (e) => {
          console.log(e);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );
      return () => {
        window.navigator.geolocation.clearWatch(geoId);
      };
    }
  }, []);

  useEffect(() => {
    if (orderedItems?.length > 0) {
      setValue('first_name', orderedItems[0]?.first_name);
      setValue('last_name', orderedItems[0]?.last_name);
      setValue('email', orderedItems[0]?.email);
      setValue('address', orderedItems[0]?.address);
      setValue('postal_code', orderedItems[0]?.postal_code);
      setValue('city', orderedItems[0]?.city);
      setValue('state', orderedItems[0]?.state);
      setValue('phone_number', orderedItems[0]?.phone_number);
    }
  }, [orderedItems, setValue]);

  return (
    <Modal
      open={authModal === 'ORDER'}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className="h-[100vh] w-[100vw] flex items-center justify-center"
    >
      <div className="flex flex-col justify-between h-[100%] w-[100%] md:h-[80%] md:w-[55%] lg:w-[45%] xl:h-[85%] xl:w-[40%] md:shadow-lg md:rounded-2xl bg-white border-none outline-none overflow-y-scroll no-scrollbar">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[100%] flex flex-col justify-between p-4"
        >
          <div className="flex flex-col">
            <div className="ml-auto cursor-pointer" onClick={handleClose}>
              <CloseIcon />
            </div>
            <p className="mr-auto ml-auto text-2xl text-[#000000cc] font-semibold pb-4">
              Make a new order
            </p>
            <div className="w-full flex flex-col md:flex-row justify-between">
              <div className="mx-2 md:w-[50%]">
                <InputField
                  label={'First name'}
                  type={'text'}
                  error={errors?.first_name?.message}
                  register={register('first_name')}
                  placeholder={'John'}
                />
                {errors?.first_name?.message && (
                  <p className="-mt-4 mb-1 text-red-600">
                    {errors?.first_name?.message}
                  </p>
                )}

                <InputField
                  label={'Last name'}
                  type={'text'}
                  error={errors?.last_name?.message}
                  register={register('last_name')}
                  placeholder={'Doe'}
                />
                {errors?.last_name?.message && (
                  <p className="-mt-4 mb-1 text-red-600">
                    {errors?.last_name?.message}
                  </p>
                )}
                <InputField
                  label={'Email'}
                  type={'email'}
                  error={errors?.email?.message}
                  register={register('email')}
                  placeholder={'onicsstore@gmail.com'}
                />
                {errors?.email?.message && (
                  <p className="-mt-4 mb-1 text-red-600">
                    {errors?.email?.message}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <InputField
                      label={'Address or Bus Stop'}
                      type={'text'}
                      error={errors?.address?.message}
                      register={register('address')}
                      placeholder={'No. 6...'}
                    />
                  </div>

                  <img
                    src={addressSvg}
                    alt=""
                    onClick={updateAddress}
                    className="h-8 mt-2 cursor-pointer"
                  />
                </div>
                {errors?.address?.message && (
                  <p className="-mt-4 mb-1 text-red-600">
                    {errors?.address?.message}
                  </p>
                )}
              </div>
              <div className="mx-2 md:w-[50%]">
                <InputField
                  label={'Postal code'}
                  type={'text'}
                  error={errors?.postal_code?.message}
                  register={register('postal_code')}
                  placeholder={'82828'}
                />
                {errors?.postal_code?.message && (
                  <p className="-mt-4 mb-1 text-red-600">
                    {errors?.postal_code?.message}
                  </p>
                )}

                <InputField
                  label={'City'}
                  type={'text'}
                  error={errors?.city?.message}
                  register={register('city')}
                  placeholder={'Doe'}
                />
                {errors?.city?.message && (
                  <p className="-mt-4 mb-1 text-red-600">
                    {errors?.city?.message}
                  </p>
                )}

                <InputField
                  label={'State'}
                  type={'text'}
                  error={errors?.state?.message}
                  register={register('state')}
                  placeholder={'Enugu'}
                />
                {errors?.state?.message && (
                  <p className="-mt-4 mb-1 text-red-600">
                    {errors?.state?.message}
                  </p>
                )}

                <InputField
                  label={'Phone number'}
                  type={'text'}
                  error={errors?.phone_number?.message}
                  register={register('phone_number')}
                  placeholder={'+234 91'}
                />
                {errors?.phone_number?.message && (
                  <p className="-mt-4 mb-1 text-red-600">
                    {errors?.phone_number?.message}
                  </p>
                )}
              </div>
            </div>
            {orderError && <Alert severity="error">{orderError}</Alert>}
          </div>
          <div className="mb-6 mx-0 mt-0 md:mt-12">
            {isOrdering ? (
              <Button loading={isOrdering}>
                <LoadingIcon />
                <p>Please wait...</p>
              </Button>
            ) : (
              <Button type="submit" loading={isOrdering}>
                Place order
              </Button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default NewOrder;
