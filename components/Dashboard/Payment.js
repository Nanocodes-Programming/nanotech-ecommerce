import { yupResolver } from '@hookform/resolvers/yup';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { Alert } from '@mui/material';
import { Cookies } from 'react-cookie';
import { API_URL } from '../../constants/api';
import { setAuthModal } from '../../store/reducers/auth_reducer';
import CloseIcon from '../utils/icons/CloseIcon';
import LoadingIcon from '../utils/icons/LoadingIcon';
import Button from '../utils/reusables/Button';
import InputField from '../utils/reusables/InputField';

const schema = yup.object().shape({
  cardno: yup.string().required('Card number is required'),
  cvv: yup.string().required('CVV is required'),
  expirymonth: yup.string().required('Expiry month is required'),
  expiryyear: yup.string().required('Expiry year is required'),
  pin: yup.string().required('Card pin is required'),
});

const Payment = () => {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [isPaying, setIsPaying] = useState(false);
  const [paymentError, setPaymentError] = useState();
  const orderID = useSelector((state) => state.payment.orderID);
  const authModal = useSelector((state) => state.auth.authModal);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    criteriaMode: 'all',
    reValidateMode: 'onSubmit',
    mode: 'onChange',
  });

  const handleClose = () => {
    reset();
    dispatch(setAuthModal(null));
  };

  const onSubmit = async (data) => {
    const reqData = {
      cardno: data?.cardno,
      cvv: data?.cvv,
      expirymonth: data?.expirymonth,
      expiryyear: data?.expiryyear,
      pin: data?.pin,
    };

    // console.log(reqData);
    setIsPaying(true);

    try {
      const res = await axios.post(
        `${API_URL}/payment/form/${orderID}`,
        reqData,
        config
      );

      if (res?.data?.error === false) {
        toast.success('Payment completed', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
        });

        handleClose();
      } else {
        setPaymentError('An error occured');
        setTimeout(() => {
          setPaymentError(null);
        }, 20000);

        toast.error('An error occured while processign your payment', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
        });
      }

      setIsPaying(false);
    } catch (err) {
      setIsPaying(false);
      setPaymentError('An error occured');
      setTimeout(() => {
        setPaymentError(null);
      }, 20000);
      console.log(err);
      return err;
    }
  };

  return (
    <Modal
      open={authModal === 'PAYMENT'}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className="h-[100vh] w-[100vw] flex items-center justify-center"
    >
      <div className="flex flex-col justify-between h-[100%] w-[100%] md:h-[95%] md:w-[55%] lg:w-[45%] xl:h-[90%] xl:w-[30%] md:shadow-lg md:rounded-2xl bg-white border-none outline-none overflow-y-scroll no-scrollbar">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[100%] flex flex-col justify-between p-4"
        >
          <div className="flex flex-col">
            <div className="ml-auto cursor-pointer" onClick={handleClose}>
              <CloseIcon />
            </div>
            <p className="mr-auto ml-auto text-3xl text-[#000000cc] font-semibold pb-4">
              Make a payment
            </p>
            <div className="mx-2">
              <InputField
                label={'Card number'}
                type={'text'}
                error={errors?.cardno?.message}
                register={register('cardno')}
                placeholder={'enter your card number'}
              />
              {errors?.cardno?.message && (
                <p className="-mt-4 mb-1 text-red-600">
                  {errors?.cardno?.message}
                </p>
              )}

              <InputField
                label={'CVV'}
                type={'text'}
                error={errors?.cvv?.message}
                register={register('cvv')}
                placeholder={'enter card cvv'}
              />
              {errors?.cvv?.message && (
                <p className="-mt-4 mb-1 text-red-600">
                  {errors?.cvv?.message}
                </p>
              )}

              <InputField
                label={'Expiry month'}
                type={'text'}
                error={errors?.expirymonth?.message}
                register={register('expirymonth')}
                placeholder={'enter card expiry month'}
              />
              {errors?.expirymonth?.message && (
                <p className="-mt-4 mb-1 text-red-600">
                  {errors?.expirymonth?.message}
                </p>
              )}

              <InputField
                label={'Expiry year'}
                type={'text'}
                error={errors?.expiryyear?.message}
                register={register('expiryyear')}
                placeholder={'enter card expiry year'}
              />
              {errors?.expiryyear?.message && (
                <p className="-mt-4 mb-1 text-red-600">
                  {errors?.expiryyear?.message}
                </p>
              )}

              <InputField
                label={'Pin'}
                type={'text'}
                error={errors?.pin?.message}
                register={register('pin')}
                placeholder={'enter you card pin'}
              />
              {errors?.pin?.message && (
                <p className="-mt-4 mb-1 text-red-600">
                  {errors?.pin?.message}
                </p>
              )}
            </div>

            {paymentError && <Alert severity="error">{paymentError}</Alert>}
          </div>

          <div className="mb-6 mx-0 mt-0 md:mt-12">
            {isPaying ? (
              <Button loading={isPaying}>
                <LoadingIcon />
                <p>Please wait...</p>
              </Button>
            ) : (
              <Button type="submit" loading={isPaying}>
                Pay
              </Button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default Payment;
