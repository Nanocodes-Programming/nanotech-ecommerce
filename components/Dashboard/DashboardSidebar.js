'use client';
import { useState } from 'react';
import { Cookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import onics_logo from '../../public/images/Nanotech.png';
import { customLogoutUser } from '../../store/actions/auth_actions';
import { setAuthModal } from '../../store/reducers/auth_reducer';
import { setDashboardPage } from '../../store/reducers/dashboard_reducer';
import AddToCartIcon from '../utils/icons/AddToCartIcon';
import LoadingIcon from '../utils/icons/LoadingIcon';
import dashboardSvg from '../utils/svgs/dashboard-svg.svg';
import orderSvg from '../utils/svgs/orders.svg';

const Sidebar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const page = useSelector((state) => state.dashboard.page);
  const cookies = new Cookies();
  const token = cookies.get('token');

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleOrder = () => {
    dispatch(setAuthModal('ORDER'));
  };

  const homeNavigate = () => {
    router.push('/');
  };

  const logOut = () => {
    setIsLoggingOut(true);
    dispatch(customLogoutUser(router, config));
    setTimeout(() => {
      setIsLoggingOut(false);
    }, 15000);
  };

  return (
    <div className="flex flex-col w-52 xl:w-64 bg-white -mb-[3.9rem] rounded-e-3xl p-4 overflow-y-hidden shadow-lg border-r border-gray-100">
      <div className="flex flex-col">
        <div className="mr-auto ml-auto flex flex-col items-center">
          <div
            onClick={homeNavigate}
            className="cursor-pointer hidden xl:inline-block mb-5"
          >
            <img src={onics_logo.src} alt="" className="h-16" />
          </div>
        </div>

        <div className="py-5 mx-2 flex flex-col">
          <div
            onClick={() => dispatch(setDashboardPage('dashboard'))}
            className={
              page === 'dashboard'
                ? 'flex items-center px-5 py-3 bg-gray-100 rounded-xl shadow-sm cursor-pointer text-gray-800 my-3 transition-all duration-300'
                : 'flex items-center px-5 py-3 cursor-pointer text-gray-600 my-3 transition-all duration-300 hover:bg-gray-50 rounded-xl'
            }
          >
            <img src={dashboardSvg.src} alt="" />
            <p className="ml-3 font-medium">Dashboard</p>
          </div>
          
          <div
            onClick={() => dispatch(setDashboardPage('cart'))}
            className={
              page === 'cart'
                ? 'flex items-center px-5 py-3 bg-gray-100 rounded-xl shadow-sm cursor-pointer text-gray-800 my-3 transition-all duration-300'
                : 'flex items-center px-5 py-3 cursor-pointer text-gray-600 my-3 transition-all duration-300 hover:bg-gray-50 rounded-xl'
            }
          >
            <AddToCartIcon color={page === 'cart' ? '#1F2937' : '#4B5563'} height={'23'} width={'23'} />
            <p className="ml-3 font-medium">Cart</p>
          </div>
          
          <div
            onClick={() => dispatch(setDashboardPage('orders'))}
            className={
              page === 'orders'
                ? 'flex items-center px-5 py-3 bg-gray-100 rounded-xl shadow-sm cursor-pointer text-gray-800 my-3 transition-all duration-300'
                : 'flex items-center px-5 py-3 cursor-pointer text-gray-600 my-3 transition-all duration-300 hover:bg-gray-50 rounded-xl'
            }
          >
            <img src={orderSvg.src} alt="" />
            <p className="ml-3 font-medium">Orders</p>
          </div>
          
          <div
            onClick={() => dispatch(setDashboardPage('bike'))}
            className={
              page === 'bike'
                ? 'flex items-center px-5 py-3 bg-gray-100 rounded-xl shadow-sm cursor-pointer text-gray-800 my-3 transition-all duration-300'
                : 'flex items-center px-5 py-3 cursor-pointer text-gray-600 my-3 transition-all duration-300 hover:bg-gray-50 rounded-xl'
            }
          >
            <img src={orderSvg.src} alt="" />
            <p className="ml-3 font-medium">Bike</p>
          </div>
        </div>
      </div>

      <div className="mt-auto mb-3 space-y-3">
        <button
          onClick={handleOrder}
          className="w-full py-3 bg-blue-600 border-none outline-none rounded-xl font-medium text-white hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow"
        >
          Start a new order
        </button>

        {!isLoggingOut ? (
          <button
            onClick={logOut}
            className="w-full py-3 bg-transparent text-gray-700 border border-gray-300 outline-none rounded-xl font-medium hover:bg-gray-50 transition-all duration-300"
          >
            Log out
          </button>
        ) : (
          <div className="w-full flex items-center justify-center py-3 bg-transparent text-gray-700 border border-gray-300 outline-none rounded-xl">
            <LoadingIcon />
          </div>
        )}

        <p
          onClick={() => dispatch(setAuthModal('PASSWORDRESET'))}
          className="cursor-pointer text-center mt-1 text-gray-600 hover:text-blue-600 transition-colors duration-300"
        >
          Change Password
        </p>
      </div>
    </div>
  );
};

export default Sidebar;