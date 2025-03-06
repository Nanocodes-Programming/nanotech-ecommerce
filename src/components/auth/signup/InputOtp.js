import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import OtpInput from 'react18-input-otp';

import LoadingIcon from '../../utils/icons/LoadingIcon';
import Button from '../../utils/reusables/Button';

const InputOtp = ({ handleClose, handleSignupPage, getAllValues }) => {
  const [state, setState] = useState({ otp: '' });
  const [error, setError] = useState('');
  const [resendingOtp, setResendingOtp] = useState(false);

  const isSignupLoading = useSelector((state) => state.auth.isSignupLoading);

  const { handleSubmit } = useForm();

  const handleChange = (otp) => {
    setError('');
    setState({ otp });
  };

  const onSubmit = async () => {
    try {
      if (state?.otp !== '') {
        const formValues = getAllValues();
        const data = {
          email: formValues?.email,
          otp: state.otp,
        };

        // console.log(data);

        handleSignupPage(2);
      }
    } catch (err) {}
  };

  const resendOtp = async () => {
    console.log('resending...');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex flex-col justify-between p-4"
    >
      <div className="flex flex-col">
        <div className="flex flex-col mx-3">
          <OtpInput
            value={state.otp}
            onChange={handleChange}
            numInputs={4}
            inputStyle={
              error
                ? {
                    outline: 'none',
                    border: '2px solid red',
                    borderRadius: '0.375rem',
                    height: '80px',
                    width: '100%',
                    margin: '5px',
                    padding: '0.9rem 1rem',
                    fontSize: '24px',
                  }
                : {
                    outline: 'none',
                    border: '2px solid rgba(0, 20, 51, 0.3)',
                    borderRadius: '0.375rem',
                    height: '80px',
                    width: '100%',
                    margin: '5px',
                    padding: '0.9rem 1rem',
                    fontSize: '24px',
                    marginTop: '2rem',
                  }
            }
          />

          <div className="ml-auto flex gap-1 mr-[5px]">
            <p>Didn't get a code?</p>
            <div>
              {resendingOtp ? (
                <LoadingIcon />
              ) : (
                <p className="text-blue-600 cursor-pointer" onClick={resendOtp}>
                  Resend
                </p>
              )}
            </div>
          </div>

          {/* <Alert
            severity="error"
            style={{
              marginTop: '0rem',
              marginBottom: '0.5rem',
            }}
          >
            Error
          </Alert> */}
        </div>
      </div>
      <div className="flex justify-between mb-5 mx-0 gap-3">
        <Button eventHandler={handleClose}>Cancel</Button>

        {isSignupLoading ? (
          <Button loading={isSignupLoading}>
            <LoadingIcon />
            <p>Please wait...</p>
          </Button>
        ) : (
          <Button type="submit" loading={isSignupLoading}>
            Verify
          </Button>
        )}
      </div>
    </form>
  );
};

export default InputOtp;
