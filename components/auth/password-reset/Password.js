'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import OTPInput from 'react-otp-input'; // Changed from react18-input-otp to react-otp-input
import * as yup from 'yup';
import { API_URL } from '../../../constants/api';
import { setPasswordResetLoading } from '../../../store/reducers/auth_reducer';
import LoadingIcon from '../../utils/icons/LoadingIcon';
import Button from '../../utils/reusables/Button';
import InputField from '../../utils/reusables/InputField';

const schema = yup.object().shape({
  code: yup.string().required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'at least 6 characters')
    .matches(RegExp('(.*[a-z].*)'), 'at least one lowercase letter')
    .matches(RegExp('(.*[A-Z].*)'), 'at least one uppercase letter')
    .matches(RegExp('(.*\\d.*)'), 'at least one number')
    .matches(
      RegExp('[!@#$%^&*(),.?":{}|<>]'),
      'at least one special character'
    ),
  confirm_password: yup
    .string()
    .required('This field is required')
    .oneOf([yup.ref('password'), null], 'Password must match'),
});

const Password = ({ setIndexValue, handleClose, getAllValues }) => {
  const dispatch = useDispatch();
  const [signupError, setSignupError] = useState();
  const [isHovering, setIsHovering] = useState(false);
  const [state, setState] = useState({ otp: '' });
  const [error, setError] = useState('');
  const isPasswordResetLoading = useSelector(
    (state) => state.auth.isPasswordResetLoading
  );

  const cookies = new Cookies();
  const token = cookies.get('token');

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    criteriaMode: 'all',
    reValidateMode: 'onSubmit',
    mode: 'onChange',
  });

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const onSubmit = async (data) => {
    setIndexValue('password', data?.password);
    setIndexValue('confirm_password', data?.confirm_password);

    const formValues = getAllValues();

    try {
      dispatch(setPasswordResetLoading(true));
      const res = await axios.post(`${API_URL}/user/confirm_password/`, {
        verification_code: formValues?.code,
        // uid: 'stephenngwu30@gmail.com',
        password: formValues?.password,
        // new_password2: formValues?.confirm_password,
      });

      console.log(res);

      toast.success('Your password has been changed ', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
      });

      dispatch(setPasswordResetLoading(false));

      if (token) {
        handleClose();
      } else {
        handleClose('LOGIN');
      }
    } catch (err) {
      // console.log(err);
      if (
        err?.response?.data?.password?.length > 0 &&
        err?.response?.data?.password[0]?.includes('you may not reset')
      ) {
        setSignupError('You cannot reset your current password');
      } else if (err?.response?.status === 400) {
        setSignupError('A user with this email does not exist');
      } else {
        setSignupError('An error occured, try again!');
      }
      dispatch(setPasswordResetLoading(false));
      setTimeout(() => {
        setSignupError(null);
      }, 20000);

      return err;
    }
  };

  const handleChange = (otp) => {
    setError('');
    setState({ otp });
  };

  useEffect(() => {
    setValue('code', state?.otp);
    setIndexValue('code', state?.otp);
  }, [setIndexValue, setValue, state]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex flex-col justify-between p-4"
    >
      <div className="mx-2">
        <div className="mb-4">
          <p className="-mb-7">Enter code</p>
          
          {/* Changed from react18-input-otp to react-otp-input */}
          <OTPInput
            value={state?.otp}
            onChange={handleChange}
            numInputs={4}
            shouldAutoFocus
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
            containerStyle={{ marginTop: '2rem' }}
            inputType="number"
            renderInput={(props) => <input {...props} />}
          />
        </div>

        <div
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className="relative"
        >
          <InputField
            label={'Password'}
            type={'password'}
            register={register('password')}
            error={errors?.password?.message}
            placeholder={'129***0065***tyh'}
            password
          />

          {errors?.password?.message && (
            <p className="-mt-4 mb-1 text-red-600">
              {errors?.password?.message}
            </p>
          )}
          {isHovering && (
            <div className="absolute bg-white -top-9 right-0 p-2 shadow-md rounded-md text-gray-800">
              Your password should have at least 1 lowercase, 1 uppercase, 1
              number, 1 special character
            </div>
          )}
        </div>

        <InputField
          label={'Confirm password'}
          type={'password'}
          register={register('confirm_password')}
          error={errors?.confirm_password?.message}
          placeholder={'Repeat your password'}
          password
        />
        {errors?.confirm_password?.message && (
          <p className="-mt-4 mb-1 text-red-600">
            {errors?.confirm_password?.message}
          </p>
        )}

        {signupError && (
          <Alert
            severity="error"
            style={{
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            }}
          >
            {signupError}
          </Alert>
        )}
      </div>
      <div className="flex justify-between mb-5 mx-2 gap-3">
        {/* <Button eventHandler={handleClose}>Cancel</Button> */}

        {isPasswordResetLoading ? (
          <Button loading={isPasswordResetLoading}>
            <LoadingIcon />
            <p>Please wait...</p>
          </Button>
        ) : (
          <Button type="submit" loading={isPasswordResetLoading}>
            Reset password
          </Button>
        )}
      </div>
    </form>
  );
};

export default Password;