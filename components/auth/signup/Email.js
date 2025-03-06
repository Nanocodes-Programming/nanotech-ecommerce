import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { useState } from 'react';
import { setSignupLoading } from '../../../store/reducers/auth_reducer';
import LoadingIcon from '../../utils/icons/LoadingIcon';
import Button from '../../utils/reusables/Button';
import InputField from '../../utils/reusables/InputField';

const schema = yup.object().shape({
  email: yup.string().email('email is not valid').required('email is required'),
  username: yup
    .string()
    .required('Username is required')
    .min(1, 'Username is less than 3')
    .max(32, 'Username is cannot be longer than 32')
    .trim(),
});

const Email = ({ handleSignupPage, setValue, getAllValues }) => {
  const dispatch = useDispatch();
  const isSignupLoading = useSelector((state) => state.auth.isSignupLoading);
  const [resError, setResError] = useState('');

  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    criteriaMode: 'all',
    reValidateMode: 'onSubmit',
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    dispatch(setSignupLoading(true));

    try {
      const { email } = getValues();
      // const res = await axios.post(
      //   `${API_URL}/auth/registration/resend-email/`,
      //   {
      //     email,
      //   }
      // );

      // console.log('Data', res);
      // if (res?.data?.detail === 'ok') {
      setValue('email', data?.email);
      setValue('username', data?.username);
      dispatch(setSignupLoading(false));
      handleSignupPage(1);
      // }
      // handleSignupPage(1);
    } catch (err) {
      dispatch(setSignupLoading(false));
      setResError('Sorry, an error occured');
    }
  };

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

          <InputField
            label={'Username'}
            type={'text'}
            error={errors?.username?.message}
            register={register('username')}
            placeholder={'onicsstore'}
          />

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
      <div className="mb-5 mx-0">
        {isSignupLoading ? (
          <Button loading={isSignupLoading}>
            <LoadingIcon />
            <p>Sending email...</p>
          </Button>
        ) : (
          <Button type="submit" loading={isSignupLoading}>
            Next
          </Button>
        )}
      </div>
    </form>
  );
};

export default Email;
