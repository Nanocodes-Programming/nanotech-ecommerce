import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { loginAction } from '../../../store/actions/auth_actions';
import { setAuthModal } from '../../../store/reducers/auth_reducer';
import CloseIcon from '../../utils/icons/CloseIcon';
import LoadingIcon from '../../utils/icons/LoadingIcon';
import Button from '../../utils/reusables/Button';
import InputField from '../../utils/reusables/InputField';

const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Email is not valid'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState(false);
  const authModal = useSelector((state) => state.auth.authModal);
  const isLoginLoading = useSelector((state) => state.auth.isLoginLoading);

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

  const handleSignup = () => {
    dispatch(setAuthModal('SIGNUP'));
  };

  const onSubmit = (data) => {
    const reqData = {
      username: data?.email,
      email: data?.email,
      password: data?.password,
    };
    dispatch(loginAction(reqData, reset))
      .then((response) => {
        if (response?.response?.status === 500) {
          setLoginError('Network error! try again');
          setTimeout(() => {
            setLoginError(null);
          }, 20000);
          return;
        }
        if (response?.response?.status === 400) {
          setLoginError('Incorrect email or password');
          setTimeout(() => {
            setLoginError(null);
          }, 20000);
          return;
        }
        if (response?.data?.access) {
          // const encryptedText = AES?.encrypt(
          //   data?.password,
          //   process.env.REACT_APP_PASS_KEY
          // ).toString();

          // dispatch(setEncryptedPass(encryptedText));
          toast.success('Welcome back!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
          });
        }
      })
      .catch((err) => {
        // console.log('auth err', err);
        return err;
      });
  };

  return (
    <Modal
      open={authModal === 'LOGIN'}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className="h-[100vh] w-[100vw] flex items-center justify-center"
    >
      <div className="flex flex-col justify-between h-[100%] w-[100%] md:h-[90%] md:w-[55%] lg:w-[45%] xl:h-[85%] xl:w-[30%] md:shadow-lg md:rounded-2xl bg-white border-none outline-none">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex flex-col justify-between p-4"
        >
          <div className="flex flex-col">
            <div className="ml-auto cursor-pointer" onClick={handleClose}>
              <CloseIcon />
            </div>
            <p className="mr-auto ml-auto text-2xl text-[#000000cc] font-semibold pb-4">
              Welcome back
            </p>
            <div className="mx-2">
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

              <InputField
                label={'Password'}
                type={'password'}
                error={errors?.password?.message}
                register={register('password')}
                placeholder={'129***0065***tyh'}
                password
              />
              {errors?.password?.message && (
                <p className="-mt-4 mb-1 text-red-600">
                  {errors?.password?.message}
                </p>
              )}
            </div>
            <div className="ml-auto mr-0 -mt-3">
              <p
                onClick={() => dispatch(setAuthModal('PASSWORDRESET'))}
                className="cursor-pointer text-amber-400"
              >
                Forgot password?
              </p>
            </div>

            {loginError && (
              <Alert
                severity="error"
                style={{
                  marginTop: '0.5rem',
                  marginBottom: '0.5rem',
                }}
              >
                {loginError}
              </Alert>
            )}
          </div>
          <div className="mb-6 mx-0">
            {isLoginLoading ? (
              <Button loading={isLoginLoading}>
                <LoadingIcon />
                <p>Please wait...</p>
              </Button>
            ) : (
              <Button type="submit" loading={isLoginLoading}>
                Log in
              </Button>
            )}
          </div>
        </form>
        <div className="w-full flex items-center justify-center gap-2 p-4 border-t">
          <p>Don&apos; t have an account?</p>
          <p className="cursor-pointer text-amber-400" onClick={handleSignup}>
            Sign up
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default Login;
