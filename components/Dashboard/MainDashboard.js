'use client'
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import { API_URL } from '../../constants/api';
import { setAuthModal } from '../../store/reducers/auth_reducer';
import DebitCardDesign from '../utils/cards/DebitCardDesign';
import LastOrder from '../utils/cards/LastOrder';
import BikeList from './BikeList';
import Cart from './Cart';
import DashboardCards from './DashboardCards';
import OrderList from './OrderList';

const fetcher = async (url, authDetails) => {
  const res = await axios.get(url, authDetails);
  return res.data;
};

const MainDashboard = () => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const token = cookies.get('token');
  const page = useSelector((state) => state.dashboard.page);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const orderUrl = `${API_URL}/order/`;
  const { data: orderedItems } = useSWR(orderUrl, (url) =>
    fetcher(url, config)
  );

  const deliveryUrl = `${API_URL}/delivery/`;
  const { data: bikeDeliveries } = useSWR(deliveryUrl, (url) =>
    fetcher(url, config)
  );

  const url = `${API_URL}/products/`;
  const { data: products } = useSWR(url);

  return (
    <div className="flex flex-col lg:flex-row justify-between ml-3 mr-5 xl:ml-7 xl:mr-20 gap-2 xl:gap-5 h-full">
      {page === 'dashboard' && <DashboardCards products={products} />}
      {page === 'orders' && (
        <OrderList orderedItems={orderedItems} products={products} />
      )}
      {page === 'cart' && <Cart />}
      {page === 'bike' && <BikeList bikeDeliveries={bikeDeliveries} />}
      <div className="hidden lg:grid w-full h-[85vh] lg:max-h-full lg:w-80 xl:w-96 lg:mb-9 border-2 border-[#9ca3af4d] rounded-xl shadow-sm p-2 xl:p-5 overflow-y-scroll no-scrollbar">
        {orderedItems?.length > 0 && (
          <LastOrder lastOrderedItem={orderedItems[0]} />
        )}
        {products && (
          <div className="border-b-2 mb-3">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xl font-semibold">Bike details</p>
            </div>
            <div className="flex-1 flex flex-col justify-evenly">
              <div className="flex items-center gap-2">
                <div className="bg-green-100 py-3 px-3 rounded-md"></div>
                <p className="font-semibold text-gray-500">
                  This can be the bike deliver details
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                dispatch(setAuthModal('DELIVERY'));
              }}
              className="w-full py-3 bg-[#FFB800] border-none outline-none rounded-lg font-semibold text-gray-50 mt-4"
            >
              Create a delivery
            </button>
          </div>
        )}
        {products && <DebitCardDesign products={products} />}
      </div>
    </div>
  );
};

export default MainDashboard;
