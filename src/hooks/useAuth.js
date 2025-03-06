import { useEffect } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import store from '../store';
import { customLogoutUser } from '../store/actions/auth_actions';

const useAuth = () => {
  const navigate = useNavigate();
  // const encryptedPass = useSelector((state) => state.auth.encryptedPass);

  // let decryptedPass;
  // if (encryptedPass) {
  //   decryptedPass = AES?.decrypt(
  //     encryptedPass,
  //     process.env.REACT_APP_PASS_KEY
  //   ).toString(enc.Utf8);
  // }

  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    const cookies = new Cookies();
    const expDate = cookies.get('date');
    const token = cookies.get('token');

    const currentDate = new Date().getTime();
    const expiryDate = new Date(expDate).getTime() * 1000;
    const isExpired = currentDate < expiryDate;

    if (token) {
      if (isExpired !== true) {
        console.log('expired token');
        store.dispatch(customLogoutUser(navigate));
      }
    }
  }, [navigate]);

  // useEffect(() => {
  //   const cookies = new Cookies();
  //   const token = cookies.get('refresh');
  //   const refreshDate = cookies.get('refresh_date');

  //   const currentDate = new Date().getTime();
  //   const expiryDate = new Date(refreshDate).getTime() * 1000;
  //   const isExpired = currentDate < expiryDate;
  //   // console.log(currentDate < expiryDate);
  //   // console.log(typeof token);

  //   if (token) {
  //     if (isExpired !== true) {
  //       // console.log('refreshing token');
  //       store.dispatch(refreshToken());
  //     }
  //   }
  // }, []);

  return;
};

export default useAuth;
