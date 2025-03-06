'use client'
import { Alert, Modal } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { Cookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import OTPInput from 'react-otp-input';
import { API_URL } from '../../../constants/api';
import { setAuthModal } from '../../../store/reducers/auth_reducer';
import LoadingIcon from '../icons/LoadingIcon';

const ValidatePaymentOtp = ({ orderId, flwRef }) => {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [state, setState] = useState({ otp: '' });
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const authModal = useSelector((state) => state.auth.authModal);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleChange = (otp) => {
    setError('');
    setState({ otp });
  };

  const handleClose = () => {
    dispatch(setAuthModal(null));
  };

  const handleValidation = async () => {
    const details = {
      otp: state?.otp,
      order_id: orderId,
      flwRef: flwRef,
    };

    try {
      if (state?.otp !== '') {
        setIsValidating(true);
        const validatePay = await axios.post(
          `${API_URL}/payment/validate/${orderId}/${flwRef}`,
          details,
          config
        );

        if (validatePay?.data?.status === 'success') {
          toast.success('Your payment is validated successfully', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
          });
          setIsValidating(false);
          handleClose();
        } else {
          toast.error('Sorry, we could not validate your payment', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
          });
          setIsValidating(false);
        }

        // console.log('pay', validatePay);
      } else {
        setIsValidating(false);
        setError('Input OTP to continue');
        setTimeout(() => {
          setError('');
        }, 20000);
      }
    } catch (err) {
      // console.error(err);
      setIsValidating(false);
    }
  };

  return (
    <Modal
      open={authModal === 'VALIDATEPAYMENT'}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className="h-[100vh] w-[100vw] flex items-center justify-center"
    >
      <div className="h-[30rem] md:h-[30rem] w-[80%] md:w-[25rem] md:shadow-lg rounded-lg bg-white border-none outline-none overflow-y-scroll no-scrollbar">
        <div className="flex flex-col justify-between px-5 py-10 h-full">
          <div className="flex flex-col items-center">
            <p className="ml-auto mr-auto text-xl font-semibold text-[#0000009e]">
              Validate your payment
            </p>
            {/* <div onClick={handleClose} className="ml-auto cursor-pointer">
              <CloseIcon />
            </div> */}
            <p className="text-[#0000009e] text-center mt-2">
              Complete processing your order by validating your payment with the
              otp sent to your mobile
            </p>
            <div>
              <OTPInput
                value={state.otp}
                onChange={handleChange}
                numInputs={4}
                shouldAutoFocus
                inputType="number"
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                  outline: 'none',
                  border: error ? '2px solid red' : '2px solid rgba(0, 20, 51, 0.3)',
                  borderRadius: '0.375rem',
                  height: '80px',
                  width: '100%',
                  margin: '5px',
                  padding: '0.9rem 1rem',
                  fontSize: '24px',
                }}
                containerStyle={
                  error ? {} : { marginTop: '2rem' }
                }
              />
              {error && (
                <Alert
                  severity="error"
                  style={{
                    marginTop: '0rem',
                    marginBottom: '0.5rem',
                  }}
                >
                  {error}
                </Alert>
              )}
            </div>
          </div>
          {isValidating ? (
            <button
              onClick={handleValidation}
              className="bg-[#FFB800] font-semibold w-full text-white py-3 px-4 mt-4 rounded-lg flex items-center justify-center"
            >
              <LoadingIcon />
              <p>Please wait...</p>
            </button>
          ) : (
            <button
              onClick={handleValidation}
              className="bg-[#FFB800] font-semibold w-full text-white py-3 px-4 mt-4 rounded-lg"
            >
              Validate Payment
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ValidatePaymentOtp;