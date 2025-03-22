'use client'
import { Drawer } from '@mui/material';
import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import onics_logo from '../../../public/images/Nanotech.png';
import { customLogoutUser } from '../../../store/actions/auth_actions';
import { setAuthModal } from '../../../store/reducers/auth_reducer';
import { setDashboardPage } from '../../../store/reducers/dashboard_reducer';
import { setMobileSideDrawer } from '../../../store/reducers/main_reducer';

const MobileSideDrawer = ({ openDrawer }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [userDashboardPage, setUserDashboardPage] = useState();
  const authenticated = useSelector((state) => state.auth.authenticated);
  const dasboardPage = useSelector((state) => state.dashboard.page);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleDrawerClose = () => {
    dispatch(setMobileSideDrawer(false));
  };

  const handleOrder = () => {
    dispatch(setAuthModal('ORDER'));
  };

  const logOut = () => {
    dispatch(customLogoutUser(router, config));
    dispatch(setMobileSideDrawer(false));
  };

  const setLogin = () => {
    dispatch(setAuthModal('LOGIN'));
    dispatch(setMobileSideDrawer(false));
  };

  const setSignup = () => {
    dispatch(setAuthModal('SIGNUP'));
    dispatch(setMobileSideDrawer(false));
  };

  useEffect(() => {
    if (
      window.location?.pathname === '/dashboard' &&
      dasboardPage === 'dashboard'
    ) {
      setUserDashboardPage('dashboard');
    } else if (
      window.location?.pathname === '/dashboard' &&
      dasboardPage === 'orders'
    ) {
      setUserDashboardPage('orders');
    } else if (
      window.location?.pathname === '/dashboard' &&
      dasboardPage === 'bike'
    ) {
      setUserDashboardPage('bike');
    }
  }, [dasboardPage, setUserDashboardPage]);

  return (
    <div className="relative">
      <Drawer 
        anchor="left" 
        open={openDrawer} 
        onClose={handleDrawerClose}
        PaperProps={{
          sx: {
            backgroundColor: '#0b0719', // Dark green background
            color: 'white'
          }
        }}
      >
        <div className="flex flex-col lg:hidden h-full justify-between w-[100%] pl-5 pb-5 pt-4 overflow-x-hidden text-white">
          <div className="pr-28">
            <img src={onics_logo.src} alt="" className="h-16" />
            <div className="flex flex-col gap-3 mt-5 ">
              <div
                onClick={() => {
                  router.push('/');
                  dispatch(setMobileSideDrawer(false));
                }}
                className="flex items-center gap-6 cursor-pointer hover:bg-[#0b0719f2] py-2 px-2 rounded-md transition-colors"
              >
                <p
                  className={
                    window.location?.pathname === '/'
                      ? 'text-lg text-[#FFB800]'
                      : 'text-lg'
                  }
                >
                  Home
                </p>
              </div>

              <div
                onClick={() => {
                  router.push('/about');
                  dispatch(setMobileSideDrawer(false));
                }}
                className="flex items-center gap-6 hover:bg-[#0b0719f2] py-2 px-2 rounded-md transition-colors"
              >
                <p
                  className={
                    window.location?.pathname === '/about'
                      ? 'text-lg text-[#FFB800]'
                      : 'text-lg'
                  }
                >
                  About
                </p>
              </div>

              <div
                onClick={() => {
                  router.push('/contact');
                  dispatch(setMobileSideDrawer(false));
                }}
                className="flex items-center gap-6 mb-5 hover:bg-[#0b0719f2] py-2 px-2 rounded-md transition-colors"
              >
                <p
                  className={
                    window.location?.pathname === '/contact'
                      ? 'text-lg text-[#FFB800]'
                      : 'text-lg'
                  }
                >
                  Contact
                </p>
              </div>
            </div>
            {authenticated && (
              <div className="w-[92%] absolute h-[1.5px] bg-[#0b0719f2]" />
            )}

            {authenticated && (
              <div className="flex flex-col gap-3 mt-5">
                <div
                  onClick={() => {
                    dispatch(setDashboardPage('dashboard'));
                    router.push('/dashboard');
                    dispatch(setMobileSideDrawer(false));
                  }}
                  className="flex items-center gap-6 hover:bg-[#0b0719f2] py-2 px-2 rounded-md transition-colors"
                >
                  <p
                    className={
                      userDashboardPage === 'dashboard'
                        ? 'text-lg text-[#FFB800]'
                        : 'text-lg'
                    }
                  >
                    Dashboard
                  </p>
                </div>

                <div
                  onClick={() => {
                    dispatch(setDashboardPage('orders'));
                    router.push('/dashboard');
                    dispatch(setMobileSideDrawer(false));
                  }}
                  className="flex items-center gap-6 hover:bg-[#0b0719f2] py-2 px-2 rounded-md transition-colors"
                >
                  <p
                    className={
                      userDashboardPage === 'orders'
                        ? 'text-lg text-[#FFB800]'
                        : 'text-lg'
                    }
                  >
                    Orders
                  </p>
                </div>

                <div
                  onClick={() => {
                    dispatch(setDashboardPage('bike'));
                    router.push('/dashboard');
                    dispatch(setMobileSideDrawer(false));
                  }}
                  className="flex items-center gap-6 hover:bg-[#0b0719f2] py-2 px-2 rounded-md transition-colors"
                >
                  <p
                    className={
                      userDashboardPage === 'bike'
                        ? 'text-lg text-[#FFB800]'
                        : 'text-lg'
                    }
                  >
                    Bike Delivery
                  </p>
                </div>

                <div 
                  onClick={logOut} 
                  className="flex items-center gap-6 mb-2 hover:bg-[#0b0719f2] py-2 px-2 rounded-md transition-colors"
                >
                  <p className="text-lg">Log out</p>
                </div>
              </div>
            )}
          </div>

          {authenticated && (
            <div className="mb-2 w-full ml-5">
              <button
                onClick={handleOrder}
                className="px-5 py-3 bg-[#FFB800] border-none outline-none rounded-lg font-semibold text-green-900 hover:bg-yellow-400 transition-colors"
              >
                Start a new order
              </button>
            </div>
          )}

          {!authenticated && (
            <div>
              <div className="mb-2 w-full ml-5">
                <button
                  className="bg-transparent text-white w-[10rem] font-bold items-center border rounded-xl border-white outline-none py-3 hover:bg-[#0b0719f2] transition-colors"
                  onClick={setLogin}
                >
                  Log in
                </button>
              </div>
              <div className="mb-2 w-full ml-5">
                <button
                  className="bg-[#FFB800] text-green-900 w-[10rem] font-bold items-center border rounded-xl border-[#FFB800] py-3 hover:bg-yellow-400 transition-colors"
                  onClick={setSignup}
                >
                  Register
                </button>
              </div>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default MobileSideDrawer;
