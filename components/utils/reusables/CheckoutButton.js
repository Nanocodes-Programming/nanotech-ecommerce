import axios from 'axios';
import { useState } from 'react';
import { Cookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import { API_URL } from '../../../constants/api';
import { setAuthModal } from '../../../store/reducers/auth_reducer';
import { setOrderID } from '../../../store/reducers/payment_reducer';
import LoadingIcon from '../icons/LoadingIcon';

const fetcher = async (url, authDetails) => {
  const res = await axios.get(url, authDetails);
  return res.data;
};

const CheckoutButton = ({ orderId }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get('token');
  const authenticated = useSelector((state) => state.auth.authenticated);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const { data: payedItems } = useSWR(`${API_URL}/order/${orderId}`, (url) =>
    fetcher(url, config)
  );

  const handlePayment = async () => {
    if (authenticated) {
      try {
        setLoading(true);

        const response = await axios.post(
          `${API_URL}/payment/paystack/${orderId}`,
          {},
          config
        );

        // console.log('Response', response?.data?.data?.payment_response?.data);

        if (response?.status === 200) {
          dispatch(
            setOrderID({
              orderId,
              ref: response?.data?.data?.payment_response?.data?.reference,
            })
          );

          window.open(
            response?.data?.data?.payment_response?.data?.authorization_url,
            '_self'
          );
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }

      // dispatch(setAuthModal('PAYMENT'));
    } else {
      dispatch(setAuthModal('LOGIN'));
    }
  };

  // const handlePaymentValidation = () => {
  //   dispatch(setAuthModal('VALIDATEPAYMENT'));
  // };

  return (
    <div>
      {payedItems?.paid === false && (
        <button
          onClick={handlePayment}
          className="px-5 py-2 bg-[#FFB800] border-none outline-none rounded-lg font-semibold text-white text-sm md:text-base"
        >
          {loading ? <LoadingIcon /> : 'Checkout'}
        </button>
      )}
      {/* {payedItems?.transactionComplete === false && (
        <div>
          <button
            onClick={handlePaymentValidation}
            className="px-5 py-2 bg-[#FFB800] border-none outline-none rounded-lg font-semibold text-white text-sm md:text-base"
          >
            Validate
          </button>
          <ValidatePaymentOtp orderId={orderId} flwRef={payedItems?.flwRef} />
        </div>
      )} */}

      {payedItems?.paid && (
        <p className="text-green-700 text-sm md:text-base font-bold mx-2">
          Order complete
        </p>
      )}
    </div>
  );
};

export default CheckoutButton;
