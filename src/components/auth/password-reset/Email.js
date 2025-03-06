import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { Alert } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { API_URL } from '../../../constants/api';
import { setPasswordResetLoading } from '../../../store/reducers/auth_reducer';
import LoadingIcon from '../../utils/icons/LoadingIcon';
import Button from '../../utils/reusables/Button';
import InputField from '../../utils/reusables/InputField';

const schema = yup.object().shape({
  email: yup.string().email('email is not valid').required('email is required'),
});

const Email = ({ handlePasswordResetPage, setIndexValue, getAllValues }) => {
  const dispatch = useDispatch();
  const isPasswordResetLoading = useSelector(
    (state) => state.auth.isPasswordResetLoading
  );
  const [resError, setResError] = useState('');

  const cookies = new Cookies();
  const user = cookies.get('user');

  const {
    getValues,
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

  const onSubmit = async () => {
    dispatch(setPasswordResetLoading(true));

    try {
      const { email } = getValues();
      const res = await axios.post(`${API_URL}/user/password_reset/`, {
        email,
      });

      console.log('Data', res);

      setIndexValue('email', email);
      dispatch(setPasswordResetLoading(false));
      handlePasswordResetPage(1);
    } catch (err) {
      console.log(err);
      dispatch(setPasswordResetLoading(false));
      setResError('Sorry, an error occured');
    }
  };

  useEffect(() => {
    if (user?.email) {
      setValue('email', user?.email);
    }
  }, [user, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex flex-col justify-between p-4"
    >
      <div className="flex flex-col">
        <div className="mx-2">
          <InputField
            label={'Email'}
            type={'email'}
            error={errors?.email?.message}
            register={register('email')}
            placeholder={'onicsstore@gmail.com'}
          />

          {resError && (
            <Alert
              severity="error"
              style={{
                marginTop: '0rem',
                marginBottom: '0.5rem',
              }}
            >
              {resError}
            </Alert>
          )}
        </div>
      </div>
      <div className="mb-5 mx-0">
        {isPasswordResetLoading ? (
          <Button loading={isPasswordResetLoading}>
            <LoadingIcon />
          </Button>
        ) : (
          <Button type="submit" loading={isPasswordResetLoading}>
            Next
          </Button>
        )}
      </div>
    </form>
  );
};

export default Email;
