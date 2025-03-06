'use client'
import { Drawer } from '@mui/material';
import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import onics_logo from '../../../images/onicss.png';
import { customLogoutUser } from '../../../store/actions/auth_actions';
import { setAuthModal } from '../../../store/reducers/auth_reducer';
import { setDashboardPage } from '../../../store/reducers/dashboard_reducer';
import { setMobileSideDrawer } from '../../../store/reducers/main_reducer';

const MobileSideDrawer = ({ openDrawer }) => {
  const navigate = useNavigate();
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
    dispatch(customLogoutUser(navigate, config));
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
      <Drawer anchor="left" open={openDrawer} onClose={handleDrawerClose}>
        <div className="flex flex-col lg:hidden h-full justify-between w-[100%] pl-5  pb-5 pt-4 text-gray-700 overflow-x-hidden">
          <div className="pr-28">
            <img src={onics_logo} alt="" className="h-16" />
            <div className="flex flex-col gap-3 mt-5 ">
              <div
                onClick={() => {
                  navigate('/');
                  dispatch(setMobileSideDrawer(false));
                }}
                className="flex items-center gap-6 cursor-pointer"
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
                  navigate('/about');
                  dispatch(setMobileSideDrawer(false));
                }}
                className="flex items-center gap-6"
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
                  navigate('/contact');
                  dispatch(setMobileSideDrawer(false));
                }}
                className={'flex items-center gap-6 mb-5'}
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
              <div className="w-[92%] absolute h-[1.5px] bg-gray-100" />
            )}

            {authenticated && (
              <div className="flex flex-col gap-3 mt-5">
                <div
                  onClick={() => {
                    dispatch(setDashboardPage('dashboard'));
                    navigate('/dashboard');
                    dispatch(setMobileSideDrawer(false));
                  }}
                  className="flex items-center gap-6"
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
                    navigate('/dashboard');
                    dispatch(setMobileSideDrawer(false));
                  }}
                  className="flex items-center gap-6"
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
                    navigate('/dashboard');
                    dispatch(setMobileSideDrawer(false));
                  }}
                  className="flex items-center gap-6"
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

                <div onClick={logOut} className="flex items-center gap-6 mb-2">
                  <p className="text-lg">Log out</p>
                </div>
              </div>
            )}
          </div>

          {authenticated && (
            <div className="mb-2 w-full ml-5">
              <button
                onClick={handleOrder}
                className="px-5 py-3 bg-[#FFB800] border-none outline-none rounded-lg font-semibold"
              >
                Start a new order
              </button>
            </div>
          )}

          {!authenticated && (
            <div>
              <div className="mb-2 w-full ml-5">
                <button
                  className="bg-transparent text-green-600 w-[10rem] font-bold items-center border rounded-xl border-green-600 outline-none  py-3"
                  onClick={setLogin}
                >
                  Log in
                </button>
              </div>
              <div className="mb-2 w-full ml-5">
                <button
                  className="bg-green-600 text-white w-[10rem] font-bold items-center border rounded-xl border-green-600 py-3"
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
