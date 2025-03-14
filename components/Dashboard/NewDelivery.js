'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { Alert } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { API_URL } from '../../constants/api';
import { setAuthModal } from '../../store/reducers/auth_reducer';
import {
  setDeliveryId,
  setUserDetails,
} from '../../store/reducers/dashboard_reducer';
import CloseIcon from '../utils/icons/CloseIcon';
import LoadingIcon from '../utils/icons/LoadingIcon';
import Button from '../utils/reusables/Button';
import InputField from '../utils/reusables/InputField';
import addressSvg from '../utils/svgs/marker-svgrepo.svg';

const schema = yup.object().shape({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  item_description: yup
    .string()
    .required('Provide a short description for your item'),
  destination_address: yup.string().required('Address is required'),
  destination_city: yup.string().required('City is required'),
  destination_state: yup.string().required('State is required'),
  phone_number: yup.string().required('Phone number is required'),
  alternative_phone_number: yup
    .string()
    .required('Please provide a second phone number'),
});

const fetcher = async (url, authDetails) => {
  const res = await axios.get(url, authDetails);
  return res.data;
};

const NewDelivery = () => {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderError, setOrderError] = useState();
  const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(null);
  const authModal = useSelector((state) => state.auth.authModal);
  const authenticated = useSelector((state) => state.auth.authenticated);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const deliveryUrl = `${API_URL}/delivery/`;
  const { data: bikeDeliveries } = useSWR(deliveryUrl, (url) =>
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
      first_name: data?.first_name,
      last_name: data?.last_name,
      item_description: data?.item_description,
      destination_address: data?.destination_address,
      destination_city: data?.destination_city,
      destination_state: data?.destination_state,
      phone_number: data?.phone_number,
      alternative_phone_number: data?.alternative_phone_number,
    };

    const reduxData = {
      first_name: data?.first_name,
      last_name: data?.last_name,
      address: data?.destination_address,
      city: data?.destination_city,
      state: data?.destination_state,
      phone_number: data?.phone_number,
      phone_number2: data?.alternative_phone_number,
    };

    dispatch(setUserDetails(reduxData));

    setIsOrdering(true);

    try {
      if (authenticated) {
        const res = await axios.post(
          `${API_URL}/delivery/create`,
          reqData,
          config
        );

        // console.log(res);
        setIsOrdering(false);
        dispatch(setDeliveryId(res?.data?.delivery_id));
        toast.success('Your bike order is completed', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
        });
        reset();
        handleClose();
      } else {
        setIsOrdering(false);
        dispatch(setAuthModal('LOGIN'));
      }
    } catch (err) {
      setIsOrdering(false);
      // console.log(err);
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

      setValue(
        'destination_address',
        response?.data?.results[0]?.formatted_address
      );
    } catch (error) {
      console.log(error);
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
    if (bikeDeliveries?.length > 0) {
      setValue('first_name', bikeDeliveries[0]?.first_name);
      setValue('last_name', bikeDeliveries[0]?.last_name);
      setValue('destination_address', bikeDeliveries[0]?.destination_address);
      setValue('destination_city', bikeDeliveries[0]?.destination_city);
      setValue('destination_state', bikeDeliveries[0]?.destination_state);
      setValue('phone_number', bikeDeliveries[0]?.phone_number);
      setValue(
        'alternative_phone_number',
        bikeDeliveries[0]?.alternative_phone_number
      );
    }
  }, [bikeDeliveries, setValue]);

  return (
    <Modal
      open={authModal === 'DELIVERY'}
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
            <p className="mr-auto ml-auto text-3xl text-[#000000cc] font-semibold pb-4">
              Order a bike
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
                  label={'Description'}
                  type={'text'}
                  error={errors?.item_description?.message}
                  register={register('item_description')}
                  placeholder={'Provide a short description for your item'}
                />
                {errors?.item_description?.message && (
                  <p className="-mt-4 mb-1 text-red-600">
                    {errors?.item_description?.message}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <InputField
                      label={'Address or Bus Stop'}
                      type={'text'}
                      error={errors?.destination_address?.message}
                      register={register('destination_address')}
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
                {errors?.destination_address?.message && (
                  <p className="-mt-4 mb-1 text-red-600">
                    {errors?.destination_address?.message}
                  </p>
                )}
              </div>
              <div className="mx-2 md:w-[50%]">
                <InputField
                  label={'City'}
                  type={'text'}
                  error={errors?.destination_city?.message}
                  register={register('destination_city')}
                  placeholder={'Nsukka'}
                />
                {errors?.destination_city?.message && (
                  <p className="-mt-4 mb-1 text-red-600">
                    {errors?.destination_city?.message}
                  </p>
                )}

                <InputField
                  label={'State'}
                  type={'text'}
                  error={errors?.destination_state?.message}
                  register={register('destination_state')}
                  placeholder={'Enugu'}
                />
                {errors?.destination_state?.message && (
                  <p className="-mt-4 mb-1 text-red-600">
                    {errors?.destination_state?.message}
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

                <InputField
                  label={'Mobile'}
                  type={'text'}
                  error={errors?.alternative_phone_number?.message}
                  register={register('alternative_phone_number')}
                  placeholder={'Provide an allternative phone number'}
                />
                {errors?.alternative_phone_number?.message && (
                  <p className="-mt-4 mb-1 text-red-600">
                    {errors?.alternative_phone_number?.message}
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
              <Button className='bg-blue-600' type="submit" loading={isOrdering}>
                Order bike
              </Button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default NewDelivery;
