import axios from 'axios';
import { Cookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants/api';
import {
  setAuthModal,
  setAuthState,
  setEncryptedPass,
  setLoginLoading,
  setToken,
  setUser,
} from '../reducers/auth_reducer';

const cookies = new Cookies();

const getNextMonth = () => {
  let d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  const nextMonth = new Date(year, month + 1, day);

  return nextMonth;
};

const getNextDays = () => {
  let d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  const next28Days = new Date(year, month + 1, day - 2);

  return next28Days;
};

// const getNextMinutes = () => {
//   let d = new Date();
//   d.setMinutes(d.getMinutes() + 3);
//   return d;
// };

export const loginAction = ({ username, email, password }, reset) => {
  const expiringDate = getNextMonth();
  const expDays = getNextDays();

  // const instance = axios.create({
  //   baseURL: `${API_URL}`,
  //   xsrfCookieName: 'csrftoken', // Make sure this matches the actual cookie name
  //   xsrfHeaderName: 'X-CSRFToken',
  // });

  return (dispatch) => {
    dispatch(setLoginLoading(true));

    return axios
      .post(
        `${API_URL}/auth/login/`,
        { username, email, password },
        {
          // withCredentials: true,
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
          },
        }
      )
      .then((response) => {
        if (response.data?.errorMessage) {
          dispatch(setLoginLoading(false));
          return response.data;
        } else {
          cookies.set('token', response.data.access, {
            path: '/',
            secure: false,
            sameSite: 'Lax',
            expires: expiringDate,
          });

          cookies.set('date', expDays, {
            path: '/',
            secure: false,
            sameSite: 'Lax',
            expires: expiringDate,
          });

          cookies.set('user', response.data.user, {
            path: '/',
            secure: false,
            sameSite: 'Lax',
            expires: expiringDate,
          });

          dispatch(setUser(response.data.user));
          dispatch(setToken(response.data.access));
          dispatch(setLoginLoading(false));
          dispatch(setAuthState(true));
          dispatch(setAuthModal(null));

          reset();

          return response;
        }
      })
      .catch((error) => {
        dispatch(setLoginLoading(false));

        return error;
      });
  };
};

export const customLogoutUser = (navigate, config) => {
  // const user = cookies.get('user');
  return async (dispatch) => {
    axios
      .post(`${API_URL}/auth/logout/`)
      .then((res) => {
        // console.log(res);
        if (res.data.detail?.includes('Successfully logged out.')) {
          dispatch(setEncryptedPass(null));
          dispatch(setAuthState(false));
          dispatch(setUser({}));
          localStorage.clear();
          cookies.remove('token', { path: '/' });
          cookies.remove('refresh', { path: '/' });
          cookies.remove('user', { path: '/' });
          cookies.remove('date', { path: '/' });
          cookies.remove('refresh_date', { path: '/' });
          navigate('/');
        }
      })
      .catch((err) => {
        toast.error('An error occured, try again', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
        });

        return err;
      });
  };
};

export const refreshToken = () => {
  const token = cookies.get('token');
  const refresh = cookies.get('refresh');
  const expiringDate = getNextMonth();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return (dispatch) => {
    return axios
      .post(`${API_URL}/auth/token/refresh/`, { refresh }, config)
      .then((response) => {
        if (response.data?.access) {
          cookies.set('token', response.data?.access, {
            path: '/',
            secure: false,
            sameSite: 'Lax',
            expires: expiringDate,
          });

          dispatch(setToken(response.data?.access));
          dispatch(setAuthState(true));

          return response;
        } else {
          return response.data;
        }
      })
      .catch((error) => {
        return error;
      });
  };
};
