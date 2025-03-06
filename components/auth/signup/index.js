'use client'
import { yupResolver } from '@hookform/resolvers/yup';
import Modal from '@mui/material/Modal';
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
  email: yup.string().email('email is not valid').required('email is required'),
  code: yup.number().required('enter six digit code'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password should be at least 6 characters.')
    .matches(
      RegExp('(.*[a-z].*)'),
      'Password must contain contan at least one lowercase letter'
    )
    .matches(
      RegExp('(.*[A-Z].*)'),
      'Password must contain contan at least one uppercase letter'
    )
    .matches(
      RegExp('(.*\\d.*)'),
      'Password must contain contan at least one number'
    )
    .matches(
      RegExp('[!@#$%^&*(),.?":{}|<>]'),
      'Password must contain contan at least one special character'
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
    'Register',
    'Register',
    'Verification',
    'Verification',
  ];

  const infoComponents = [
    'Please enter your email and choose a strong password',
    `We've sent a code to ${email}`,
    'Choose a strong password',
  ];

  return (
    <Modal
      open={authModal === 'SIGNUP'}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className="h-[100vh] w-[100vw] flex items-center justify-center"
    >
      <div className="flex flex-col justify-between h-[100%] w-[100%] md:h-[90%] md:w-[55%] lg:w-[45%] xl:h-[85%] xl:w-[30%] md:shadow-lg md:rounded-2xl bg-white border-none outline-none">
        <div className="flex">
          {signupComponent > 0 && (
            <div className="mr-auto cursor-pointer m-4" onClick={goBack}>
              <BackArrowIcon color={'black'} height={'21'} width={'25'} />
            </div>
          )}
          {signupComponent === 0 && (
            <div className="ml-auto cursor-pointer m-4" onClick={handleClose}>
              <CloseIcon />
            </div>
          )}
        </div>
        <div className="flex flex-col items-center mx-2 -mt-2 mb-1">
          <p className="text-2xl text-[#000000cc] font-semibold py-0">
            {headerComponents[signupComponent]}
          </p>
          <p className="text-lg text-[#000000cc] py-0 text-center">
            {infoComponents[signupComponent]}
          </p>
        </div>
        <Page
          generalRegister={register}
          errors={errors}
          setValue={setValue}
          getAllValues={getValues}
          handleSignupPage={handleSignupPage}
          handleClose={handleClose}
        />
        <div className="w-full flex items-center justify-center gap-2 p-4 border-t">
          <p>Already have an account?</p>
          <p className="cursor-pointer text-amber-400" onClick={handleLogin}>
            Log in
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default Signup;
