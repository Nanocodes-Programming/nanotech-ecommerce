import axios from 'axios';
import { useEffect } from 'react';
import { Cookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DashboardSidebar from '../../components/Dashboard/DashboardSidebar';
import MainDashboard from '../../components/Dashboard/MainDashboard';
import DashboardHeader from '../../components/DashboardHeader';
import { API_URL } from '../../constants/api';
import { setAuthModal } from '../../store/reducers/auth_reducer';
import { setOrderID } from '../../store/reducers/payment_reducer';

const CompletePayment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.auth.authenticated);
  const orderID = useSelector((state) => state.payment.orderID);

  const cookies = new Cookies();
  const token = cookies.get('token');

  const handleLogin = () => {
    dispatch(setAuthModal('LOGIN'));
  };

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    (async () => {
      try {
        const res = await axios.get(
          `${API_URL}/payment/validate-paystack/${orderID?.orderId}/${orderID?.ref}`,
          config
        );

        console.log(res);

        if (res?.data?.payment_status === 'success') {
          toast.success('Your payment has been successfully validated', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 4000,
            hideProgressBar: false,
          });
          dispatch(setOrderID(null));
          navigate('/dashboard');
        } else {
          toast.error('Your payment could not be validated', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 4000,
            hideProgressBar: false,
          });
          dispatch(setOrderID(null));
        }
      } catch (err) {
        return err;
      }
    })();
  }, [dispatch, navigate, orderID, token]);

  return (
    <>
      {authenticated ? (
        <div className="flex h-[90vh] w-[100vw]">
          <div className="hidden md:flex">
            <DashboardSidebar />
          </div>
          <div className="w-full mb-10 md:mb-0 -mt-5 md:mt-0">
            <div className="text-gray-500">
              <DashboardHeader />
            </div>
            <MainDashboard />
          </div>
        </div>
      ) : (
        <div className="h-[90vh] flex items-center justify-center">
          <p
            onClick={handleLogin}
            className="text-3xl cursor-pointer hover:underline hover:text-blue-700 tracking-widest"
          >
            Log in to go to your dashboard
          </p>
        </div>
      )}
    </>
  );
};

export default CompletePayment;
