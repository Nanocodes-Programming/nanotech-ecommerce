import { yupResolver } from '@hookform/resolvers/yup';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { Cookies } from 'react-cookie';
import {
  setAuthModal,
  setPasswordResetLoading,
  setPasswordResetStep,
  setSignupLoading,
} from '../../../store/reducers/auth_reducer';
import BackArrowIcon from '../../utils/icons/BackArrowIcon';
import CloseIcon from '../../utils/icons/CloseIcon';
import Email from './Email';
import Password from './Password';

const schema = yup.object().shape({
  email: yup.string().email('Email is not valid').required('Email is required'),
  code: yup.number().required('Enter code'),
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

const PasswordReset = () => {
  const dispatch = useDispatch();
  const authModal = useSelector((state) => state.auth.authModal);
  const passwordResetComponent = useSelector(
    (state) => state.auth.passwordResetStep
  );

  const cookies = new Cookies();
  const token = cookies.get('token');

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

  const pageComponents = [Email, Password];
  const Page = pageComponents[passwordResetComponent];

  const handlePasswordResetPage = (page) => {
    dispatch(setPasswordResetStep(page));
  };

  const handleClose = (value) => {
    reset();
    dispatch(setPasswordResetLoading(false));
    handlePasswordResetPage(0);
    dispatch(setAuthModal(value || null));
  };

  const goBack = () => {
    dispatch(setSignupLoading(false));
    handlePasswordResetPage(passwordResetComponent - 1);
  };

  const handleLogin = () => {
    handlePasswordResetPage(0);
    dispatch(setAuthModal('LOGIN'));
  };

  const { email } = getValues();
  const headerComponents = ['Reset Password', ''];

  const infoComponents = [
    'Please enter your email',
    `We've sent a code to ${email}`,
  ];

  return (
    <Modal
      open={authModal === 'PASSWORDRESET'}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className="h-[100vh] w-[100vw] flex items-center justify-center"
    >
      <div className="flex flex-col justify-between h-[100%] w-[100%] md:h-[90%] md:w-[55%] lg:w-[45%] xl:h-[85%] xl:w-[30%] md:shadow-lg md:rounded-2xl bg-white border-none outline-none">
        <div className="flex">
          {passwordResetComponent > 0 && (
            <div className="mr-auto cursor-pointer m-4" onClick={goBack}>
              <BackArrowIcon color={'black'} height={'21'} width={'25'} />
            </div>
          )}
          {passwordResetComponent === 0 && (
            <div className="ml-auto cursor-pointer m-4" onClick={handleClose}>
              <CloseIcon />
            </div>
          )}
        </div>
        <div className="flex flex-col items-center mx-2 -mt-2 mb-1">
          <p className="text-2xl text-[#000000cc] font-semibold py-0">
            {headerComponents[passwordResetComponent]}
          </p>
          <p className="text-lg text-[#000000cc] py-0 text-center">
            {infoComponents[passwordResetComponent]}
          </p>
        </div>
        <Page
          generalRegister={register}
          errors={errors}
          setIndexValue={setValue}
          getAllValues={getValues}
          handlePasswordResetPage={handlePasswordResetPage}
          handleClose={handleClose}
        />
        {!token && (
          <div className="w-full flex items-center justify-center gap-2 p-4 border-t">
            <p>Already have an account?</p>
            <p className="cursor-pointer text-amber-400" onClick={handleLogin}>
              Log in
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PasswordReset;
