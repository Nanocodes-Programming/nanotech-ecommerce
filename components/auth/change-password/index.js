import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import axios from 'axios';
import { Cookies } from 'react-cookie';
import { API_URL } from '../../../constants/api';
import {
  setAuthModal,
  setChangePasswordLoading,
} from '../../../store/reducers/auth_reducer';
import CloseIcon from '../../utils/icons/CloseIcon';
import LoadingIcon from '../../utils/icons/LoadingIcon';
import Button from '../../utils/reusables/Button';
import InputField from '../../utils/reusables/InputField';

const schema = yup.object().shape({
  old_password: yup.string().required('Current password is required'),
  new_password: yup
    .string()
    .required('New password is required')
    .min(6, 'at least 6 characters')
    .matches(RegExp('(.*[a-z].*)'), 'at least one lowercase letter')
    .matches(RegExp('(.*[A-Z].*)'), 'at least one uppercase letter')
    .matches(RegExp('(.*\\d.*)'), 'at least one number')
    .matches(
      RegExp('[!@#$%^&*(),.?":{}|<>]'),
      'at least one special character'
    ),
});

const ChangePassword = () => {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [changePasswordError, setChangePasswordError] = useState(null);
  const authModal = useSelector((state) => state.auth.authModal);
  const isChangePasswordLoading = useSelector(
    (state) => state.auth.isChangePasswordLoading
  );

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
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const reqData = {
      new_password1: data?.new_password,
      new_password2: data?.new_password,
    };

    try {
      if (data?.old_password === data?.new_password) {
        return setChangePasswordError('Both passwords must be different');
      }

      dispatch(setChangePasswordLoading(true));
      const response = await axios.post(
        `${API_URL}/auth/password/change/`,
        reqData,
        config
      );

      console.log(response);
      toast.success('Your password have been changed', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
      });

      dispatch(setChangePasswordLoading(false));
      setChangePasswordError(null);
      handleClose();
    } catch (error) {
      console.log(error);
      setChangePasswordError('An error occured');
      dispatch(setChangePasswordLoading(false));
    }
  };

  return (
    <Modal
      open={authModal === 'CHANGEPASSWORD'}
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
              Change Password
            </p>
            <div className="mx-2">
              <InputField
                label={'Current Password'}
                type={'password'}
                error={errors?.old_password?.message}
                register={register('old_password')}
                placeholder={'12uEr#'}
                password
              />
              {errors?.old_password?.message && (
                <p className="-mt-4 mb-1 text-red-600">
                  {errors?.old_password?.message}
                </p>
              )}

              <InputField
                label={'New Password'}
                type={'password'}
                error={errors?.new_password?.message}
                register={register('new_password')}
                placeholder={'129***0065***tyh'}
                password
              />
              {errors?.new_password?.message && (
                <p className="-mt-4 mb-1 text-red-600">
                  {errors?.new_password?.message}
                </p>
              )}
            </div>

            {changePasswordError && (
              <Alert
                severity="error"
                style={{
                  marginTop: '0.5rem',
                  marginBottom: '0.5rem',
                }}
              >
                {changePasswordError}
              </Alert>
            )}
          </div>
          <div className="mb-6 mx-0">
            {isChangePasswordLoading ? (
              <Button loading={isChangePasswordLoading}>
                <LoadingIcon />
                <p>Please wait...</p>
              </Button>
            ) : (
              <Button type="submit" loading={isChangePasswordLoading}>
                Submit
              </Button>
            )}
          </div>
        </form>
        {/* <div className="w-full flex items-center justify-center gap-2 p-4 border-t">
          <p>Don&apos; t have an account?</p>
          <p className="cursor-pointer text-amber-400" onClick={handleSignup}>
            Sign up
          </p>
        </div> */}
      </div>
    </Modal>
  );
};

export default ChangePassword;
