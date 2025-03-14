'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
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
          toast.success('Welcome back, Gamer!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
            icon: "🎮",
          });
        }
      })
      .catch((err) => {
        return err;
      });
  };

  // Animation for background particles
  useEffect(() => {
    if (authModal === 'LOGIN') {
      const particles = document.querySelectorAll('.particle');
      particles.forEach((particle, i) => {
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        
        // Random scale
        const scale = 0.5 + Math.random() * 1.5;
        particle.style.transform = `scale(${scale})`;
        
        // Random animation delay
        particle.style.animationDelay = `${i * 0.2}s`;
      });
    }
  }, [authModal]);

  return (
    <Modal
      open={authModal === 'LOGIN'}
      onClose={handleClose}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
      className="h-[100vh] w-[100vw] flex items-center justify-center"
    >
      <div className="relative flex flex-col justify-between h-[100%] w-[100%] md:h-[90%] md:w-[55%] lg:w-[45%] xl:h-[85%] xl:w-[30%] md:shadow-lg md:rounded-2xl border-none outline-none overflow-hidden bg-[#0B0719]">
        {/* Custom CSS for gaming effects */}
        <style jsx>{`
          @keyframes glowPulse {
            0% { box-shadow: 0 0 5px rgba(0, 102, 255, 0.3), 0 0 10px rgba(0, 102, 255, 0.2); }
            50% { box-shadow: 0 0 20px rgba(0, 102, 255, 0.5), 0 0 30px rgba(0, 102, 255, 0.4); }
            100% { box-shadow: 0 0 5px rgba(0, 102, 255, 0.3), 0 0 10px rgba(0, 102, 255, 0.2); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-10px) scale(1.1); }
          }
          
          @keyframes rotateGlow {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
          
          @keyframes fadeInOut {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.7; }
          }
          
          .gaming-modal {
            animation: glowPulse 3s infinite;
          }
          
          .rotate-bg {
            animation: rotateGlow 20s linear infinite;
          }
          
          .particle {
            position: absolute;
            width: 10px;
            height: 10px;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(59, 130, 246, 0) 70%);
            border-radius: 50%;
            animation: fadeInOut 3s infinite;
          }
          
          .button-glow:hover {
            animation: glowPulse 1.5s infinite;
          }
          
          .floating-icon {
            animation: float 6s ease-in-out infinite;
          }
        `}</style>
        
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B0719] via-[#17143a] to-[#0B0719]">
          {/* Rotating gradient overlay */}
          <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] rotate-bg opacity-10"
               style={{
                 background: 'conic-gradient(from 0deg, transparent, rgba(59, 130, 246, 0.3), transparent, transparent)',
               }}></div>
               
          {/* Grid lines */}
          <div className="absolute inset-0" 
               style={{
                 backgroundImage: 'linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
                 backgroundSize: '20px 20px',
                 opacity: 0.3
               }}></div>
               
          {/* Animated particles */}
          {Array.from({ length: 15 }).map((_, index) => (
            <div key={index} className="particle"></div>
          ))}
          
          {/* Larger glowing orbs */}
          <div className="absolute top-1/4 right-1/4 w-40 h-40 rounded-full bg-blue-600/10 blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/4 w-60 h-60 rounded-full bg-purple-600/10 blur-3xl"></div>
        </div>
        
        {/* Login Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex flex-col justify-between p-6 z-10"
        >
          <div className="flex flex-col">
            {/* Close button */}
            <div className="ml-auto cursor-pointer bg-gray-800/50 hover:bg-gray-700 p-2 rounded-full transition-colors" onClick={handleClose}>
              <CloseIcon color="#FFFFFF" />
            </div>
            
            {/* Gaming icon */}
            <div className="mx-auto mb-2 floating-icon">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
            
            {/* Welcome text */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-1">
                Welcome Back
              </h2>
              <p className="text-blue-200 text-sm">
                Login to continue 
              </p>
            </div>
            
            {/* Input fields */}
            <div className="space-y-5 w-full">
              <div className="relative">
                <InputField
                  label={'Email'}
                  type={'email'}
                  error={errors?.email?.message}
                  register={register('email')}
                  placeholder={'gamer@email.com'}
                  inputClassName="bg-gray-800/50 border-blue-500/30 text-white placeholder-gray-500 focus:border-blue-400"
                  labelClassName="text-blue-300"
                />
                {errors?.email?.message && (
                  <p className="mt-1 text-red-400 text-sm">
                    {errors?.email?.message}
                  </p>
                )}
              </div>

              <div className="relative">
                <InputField
                  label={'Password'}
                  type={'password'}
                  error={errors?.password?.message}
                  register={register('password')}
                  placeholder={'••••••••••••'}
                  password
                  inputClassName="bg-gray-800/50 border-blue-500/30 text-white placeholder-gray-500 focus:border-blue-400"
                  labelClassName="text-blue-300"
                />
                {errors?.password?.message && (
                  <p className="mt-1 text-red-400 text-sm">
                    {errors?.password?.message}
                  </p>
                )}
              </div>
            </div>
            
            {/* Forgot password link */}
            <div className="ml-auto mr-0 mt-2">
              <p
                onClick={() => dispatch(setAuthModal('PASSWORDRESET'))}
                className="cursor-pointer text-blue-400 hover:text-blue-300 transition-colors text-sm"
              >
                Forgot password?
              </p>
            </div>

            {/* Error alert */}
            {loginError && (
              <Alert
                severity="error"
                style={{
                  marginTop: '1rem',
                  marginBottom: '1rem',
                  backgroundColor: 'rgba(220, 38, 38, 0.1)',
                  color: '#ef4444',
                }}
              >
                {loginError}
              </Alert>
            )}
          </div>
          
          {/* Submit button */}
          <div className="mb-6 mx-0 mt-6">
            {isLoginLoading ? (
              <button
                disabled
                className="w-full py-3 rounded-md bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white font-medium flex items-center justify-center"
              >
                <LoadingIcon />
                <p className="ml-2">Logging in...</p>
              </button>
            ) : (
              <button
                type="submit"
                className="button-glow w-full py-3 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all"
              >
                Login to Your Account
              </button>
            )}
          </div>
        </form>
        
        {/* Sign up link */}
        <div className="w-full flex items-center justify-center gap-2 p-4 border-t border-blue-500/30 bg-gray-900/50 backdrop-blur-sm z-10">
          <p className="text-gray-300">Don't have an account?</p>
          <p className="cursor-pointer font-medium text-blue-400 hover:text-blue-300 transition-colors" onClick={handleSignup}>
            Sign up
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default Login;