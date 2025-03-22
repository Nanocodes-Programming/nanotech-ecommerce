'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { Alert } from '@mui/material';
import { useState } from 'react';
import { Cookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { API_URL } from '../../../constants/api';
import {
  setAuthModal,
  setAuthState,
  setSignupLoading,
  setToken,
  setUser,
} from '../../../store/reducers/auth_reducer';
import LoadingIcon from '../../utils/icons/LoadingIcon';
import Button from '../../utils/reusables/Button';
import InputField from '../../utils/reusables/InputField';

const schema = yup.object().shape({
  email: yup.string().email('email is not valid').required('Email is required'),
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

const Password = ({ setValue, handleClose, getAllValues }) => {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const [signupError, setSignupError] = useState();
  const [isHovering, setIsHovering] = useState(false);
  const isSignupLoading = useSelector((state) => state.auth.isSignupLoading);

  const {
    register,
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

  const getNextMonth = () => {
    let d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();
    const nextMonth = new Date(year, month + 1, day);

    return nextMonth;
  };

  const onSubmit = async (data) => {
    setValue('email', data?.email);
    setValue('username', data?.email);
    setValue('password', data?.password);
    setValue('confirm_password', data?.confirm_password);
    const expiringDate = getNextMonth();

    const formValues = getAllValues();

    dispatch(setSignupLoading(true));

    try {
      const res = await axios.post(
        `${API_URL}/auth/registration/`,
        {
          username: formValues?.username,
          email: formValues?.email,
          password1: formValues?.password,
          password2: formValues?.confirm_password,
        },
        {
          'Content-Type': 'application/json',
        }
      );

      if (res?.data?.access) {
        cookies.set('token', res?.data.access, {
          path: '/',
          secure: false,
          sameSite: 'Lax',
          expires: expiringDate,
        });

        cookies.set('refresh', res?.data.refresh, {
          path: '/',
          secure: false,
          sameSite: 'Lax',
          expires: expiringDate,
        });

        cookies.set('date', expiringDate, {
          path: '/',
          secure: false,
          sameSite: 'Lax',
          expires: expiringDate,
        });

        cookies.set('user', res?.data.user, {
          path: '/',
          secure: false,
          sameSite: 'Lax',
          expires: expiringDate,
        });

        dispatch(setUser(res?.data?.user));
        dispatch(setToken(res?.data?.access));
        dispatch(setAuthState(true));
        dispatch(setAuthModal(null));

        toast.success('Welcome to Onics stores', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
        });

        dispatch(setSignupLoading(false));

        handleClose();
      } else {
        setSignupError('An error occured. Try again!');
        dispatch(setSignupLoading(false));
        setTimeout(() => {
          setSignupError(null);
        }, 20000);
      }
    } catch (err) {
      // console.log(err);
      setSignupError(err?.response?.data?.email[0]);
      dispatch(setSignupLoading(false));
      setTimeout(() => {
        setSignupError(null);
      }, 20000);
    }

    // handleSignupPage(4);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex flex-col justify-between p-4"
    >
      <div className="mx-2">
        <InputField
          label={'Email'}
          type={'email'}
          error={errors?.email?.message}
          register={register('email')}
          placeholder={'sales@nanotech.nanocodes.com.ng'}
        />
        {errors?.email?.message && (
          <p className="-mt-4 mb-1 text-red-600">{errors?.email?.message}</p>
        )}

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

        {isSignupLoading ? (
          <Button loading={isSignupLoading}>
            <LoadingIcon />
            <p>Please wait...</p>
          </Button>
        ) : (
          <Button type="submit" loading={isSignupLoading}>
            Sign up
          </Button>
        )}
      </div>
    </form>
  );
};

export default Password;
