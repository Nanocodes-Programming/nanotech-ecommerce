'use client'
import { yupResolver } from '@hookform/resolvers/yup';
import Modal from '@mui/material/Modal';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import {
  setAuthModal,
  setSignupLoading,
  setSignupStep,
} from '../../../store/reducers/auth_reducer';
import BackArrowIcon from '../../utils/icons/BackArrowIcon';
import CloseIcon from '../../utils/icons/CloseIcon';
import Password from './Password';

const schema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(1, 'Username is less than 3')
    .max(32, 'Username is cannot be longer than 32')
    .trim(),
  email: yup.string().email('Email is not valid').required('Email is required'),
  code: yup.number().required('Enter six digit code'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password should be at least 6 characters.')
    .matches(
      RegExp('(.*[a-z].*)'),
      'Password must contain at least one lowercase letter'
    )
    .matches(
      RegExp('(.*[A-Z].*)'),
      'Password must contain at least one uppercase letter'
    )
    .matches(
      RegExp('(.*\\d.*)'),
      'Password must contain at least one number'
    )
    .matches(
      RegExp('[!@#$%^&*(),.?":{}|<>]'),
      'Password must contain at least one special character'
    ),
  confirm_password: yup
    .string()
    .required('Confirm your password')
    .oneOf([yup.ref('password'), null], 'Password must match'),
});

const Signup = () => {
  const dispatch = useDispatch();
  const authModal = useSelector((state) => state.auth.authModal);
  const signupComponent = useSelector((state) => state.auth.signupStep);

  const {
    getValues,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    criteriaMode: 'all',
    reValidateMode: 'onSubmit',
    mode: 'onChange',
  });

  const pageComponents = [Password];
  const Page = pageComponents[signupComponent];

  const handleSignupPage = (page) => {
    dispatch(setSignupStep(page));
  };

  const handleClose = () => {
    reset();
    dispatch(setAuthModal(null));
    handleSignupPage(0);
  };

  const goBack = () => {
    dispatch(setSignupLoading(false));
    handleSignupPage(signupComponent - 1);
  };

  const handleLogin = () => {
    dispatch(setAuthModal('LOGIN'));
  };

  const { email } = getValues();
  const headerComponents = [
    'Join the  Elite',
    'Join the  Elite',
    'Verification',
    'Verification',
  ];

  const infoComponents = [
    'Create your account to unlock exclusive  features',
    `We've sent a code to ${email}`,
    'Choose a strong password to protect your  account',
  ];

  // Animation for background particles
  useEffect(() => {
    if (authModal === 'SIGNUP') {
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
      open={authModal === 'SIGNUP'}
      onClose={handleClose}
      aria-labelledby="signup-modal-title"
      aria-describedby="signup-modal-description"
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
          
          .hexagon {
            clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          }
        `}</style>
        
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B0719] via-[#17143a] to-[#0B0719] z-0">
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
        
        {/* Header Navigation */}
        <div className="flex relative z-10">
          {signupComponent > 0 && (
            <div className="mr-auto cursor-pointer m-4 bg-gray-800/50 hover:bg-gray-700 p-2 rounded-full transition-colors" onClick={goBack}>
              <BackArrowIcon color={'white'} height={'21'} width={'25'} />
            </div>
          )}
          {signupComponent === 0 && (
            <div className="ml-auto cursor-pointer m-4 bg-gray-800/50 hover:bg-gray-700 p-2 rounded-full transition-colors" onClick={handleClose}>
              <CloseIcon color={'white'} />
            </div>
          )}
        </div>
        
        {/* Gaming Icon */}
        <div className="relative z-10 flex flex-col items-center mx-2 -mt-2 mb-1">
          <div className="mb-4 floating-icon">
            <div className="hexagon bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
            {headerComponents[signupComponent]}
          </h2>
          <p className="text-blue-200 text-sm md:text-base text-center px-4">
            {infoComponents[signupComponent]}
          </p>
        </div>
        
        {/* Page Content - wrap the component to inject styling */}
        <div className="flex-1 relative z-10 px-4">
          <Page
            generalRegister={register}
            errors={errors}
            setValue={setValue}
            getAllValues={getValues}
            handleSignupPage={handleSignupPage}
            handleClose={handleClose}
            // Passing styling props for child components
            gamingStyle={{
              inputClass: "bg-gray-800/50 border-blue-500/30 text-white placeholder-gray-500 focus:border-blue-400",
              labelClass: "text-blue-300",
              buttonClass: "button-glow w-full py-3 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all",
              errorClass: "text-red-400"
            }}
          />
        </div>
        
        {/* Sign in link */}
        <div className="w-full flex items-center justify-center gap-2 p-4 border-t border-blue-500/30 bg-gray-900/50 backdrop-blur-sm z-10">
          <p className="text-gray-300">Already have an account?</p>
          <p className="cursor-pointer font-medium text-blue-400 hover:text-blue-300 transition-colors" onClick={handleLogin}>
            Log in
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default Signup;