
'use client';
import { useState } from 'react';
import { Cookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import onics_logo from '../../images/onicss.png';
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
  // console.log(product);

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
    <div className="flex flex-col text-white w-52 xl:w-64 bg-green-700 -mb-[3.9rem] rounded-e-3xl p-4 overflow-y-hidden">
      <div className="flex flex-col">
        <div className="mr-auto ml-auto flex flex-col items-center">
          <div
            onClick={homeNavigate}
            className="cursor-pointer hidden xl:inline-block"
          >
            <img src={onics_logo.src} alt="" className="h-16" />
          </div>
          {/* <div className="mb-5">
            <Avatar src="" alt="" sx={{ width: 80, height: 80 }} />
          </div> */}
          {/* <p className="font-semibold text-lg">Hello</p> */}
        </div>

        <div className="py-10 mx-2 flex flex-col">
          <div
            onClick={() => dispatch(setDashboardPage('dashboard'))}
            className={
              page === 'dashboard'
                ? 'flex items-center px-5 py-3 bg-white rounded-lg cursor-pointer text-green-700 my-4 transition ease-in-out delay-250'
                : 'flex items-center px-5 py-3 cursor-pointer text-white my-4 transition ease-in-out delay-10'
            }
          >
            <img src={dashboardSvg.src} alt="" />
            <p className="ml-2 font-semibold">Dashboard</p>
          </div>
          <div
            onClick={() => dispatch(setDashboardPage('cart'))}
            className={
              page === 'cart'
                ? 'flex items-center px-5 py-3 bg-white rounded-lg cursor-pointer text-green-700 my-5  transition ease-in-out delay-250'
                : 'flex items-center px-5 py-3 mt-5 cursor-pointer text-white my-5 transition ease-in-out delay-10'
            }
          >
            <AddToCartIcon color={'#166534'} height={'23'} width={'23'} />
            <p className="ml-2 font-semibold">Cart</p>
          </div>
          <div
            onClick={() => dispatch(setDashboardPage('orders'))}
            className={
              page === 'orders'
                ? 'flex items-center px-5 py-3 bg-white rounded-lg cursor-pointer text-green-800 my-5  transition ease-in-out delay-250'
                : 'flex items-center px-5 py-3 mt-5 cursor-pointer text-white my-5 transition ease-in-out delay-10'
            }
          >
            <img src={orderSvg.src} alt="" />
            <p className="ml-2 font-semibold">Orders</p>
          </div>
          <div
            onClick={() => dispatch(setDashboardPage('bike'))}
            className={
              page === 'bike'
                ? 'flex items-center px-5 py-3 bg-white rounded-lg cursor-pointer text-green-800 my-5  transition ease-in-out delay-250'
                : 'flex items-center px-5 py-3 mt-5 cursor-pointer text-white my-5 transition ease-in-out delay-10'
            }
          >
            <img src={orderSvg.src} alt="" />
            <p className="ml-2 font-semibold">Bike</p>
          </div>
        </div>
      </div>

      <div className="mt-auto mb-5">
        <button
          onClick={handleOrder}
          className="w-[93%] mr-auto ml-auto py-3 bg-[#FFB800] border-none outline-none rounded-lg font-semibold mb-3"
        >
          Start a new order
        </button>

        {!isLoggingOut ? (
          <button
            onClick={logOut}
            className="w-[93%] mr-auto ml-auto py-3 bg-transparent text-[#FFB800] border border-[#FFB800] outline-offset-4 rounded-lg font-semibold"
          >
            Log out
          </button>
        ) : (
          <div className="w-[88%] mr-auto ml-auto flex items-center justify-center py-[14px] bg-transparent text-[#FFB800] border border-[#FFB800] outline-none rounded-lg">
            <LoadingIcon />
          </div>
        )}

        <p
          onClick={() => dispatch(setAuthModal('PASSWORDRESET'))}
          className="cursor-pointer text-center mt-2 font-semibold text-[#FFB800] hover:underline"
        >
          Change Password
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
