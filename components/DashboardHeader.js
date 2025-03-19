'use client'
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { Cookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
import useAuth from '../hooks/useAuth';
import onics_logo from '../public/images/Nanotech.png';
import { setAuthModal } from '../store/reducers/auth_reducer';
import {
  setMobileSearch,
  setMobileSideDrawer,
} from '../store/reducers/main_reducer';
import AutoSearch from './AutoSearch';
import CartIcon from './utils/icons/CartIcon';
import NavbarIcon from './utils/icons/NavbarIcon';
import SearchIcon from './utils/icons/SearchIcon';
import MobileSearchBar from './utils/reusables/MobileSearchBar';
import MobileSideDrawer from './utils/reusables/MobileSideDrawer';

const DashboardHeader = () => {
  useAuth();
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const router = useRouter();
  const user = cookies.get('user');
  const authenticated = useSelector((state) => state.auth.authenticated);
  const mobileSearch = useSelector((state) => state.main.mobileSearch);
  const mobileSideDrawer = useSelector((state) => state.main.mobileSideDrawer);
  const cartItems = useSelector((state) => state.dashboard.cartItems || []);
  
  // Calculate total number of items in cart
  const cartItemCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  const setLogin = () => {
    dispatch(setAuthModal('LOGIN'));
  };

  const setSignup = () => {
    dispatch(setAuthModal('SIGNUP'));
  };

  const showSidedrawer = () => {
    dispatch(setMobileSideDrawer(true));
  };

  const homeNavigate = () => {
    router.push('/');
  };

  return (
    <nav className="flex justify-between lg:justify-evenly items-center bg-white py-4 px-4 shadow-sm relative z-10">
      {/* Mobile Logo */}
      <div
        onClick={homeNavigate}
        className="inline-block md:hidden cursor-pointer"
      >
        <img src={onics_logo.src} alt="Logo" className="h-12" />
      </div>
      
      {/* Search Bar - Desktop */}
      <div className="mr-auto ml-auto hidden md:flex md:z-auto">
        <AutoSearch />
      </div>
      
      {/* Mobile Navigation */}
      <div className="lg:hidden flex items-center gap-4">
        {/* Search Icon - Mobile */}
        <div
          onClick={() => dispatch(setMobileSearch(!mobileSearch))}
          className="block md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <SearchIcon height={22} width={22} />
        </div>
        
        {/* Cart Icon - Mobile */}
        <div 
          onClick={() => router.push('/cart')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <CartIcon color={'#4B5563'} itemCount={cartItemCount} />
        </div>
        
        {/* Mobile Search Bar - Conditional */}
        {mobileSearch && (
          <div className="absolute -bottom-8 left-0 right-0 px-4">
            <MobileSearchBar />
          </div>
        )}

        {/* Avatar/Menu Icon - Mobile */}
        {authenticated ? (
          <div className="cursor-pointer relative">
            <div onClick={showSidedrawer} className="p-1">
              <Avatar src="" alt="" sx={{ width: 36, height: 36 }} />
            </div>
            <MobileSideDrawer openDrawer={mobileSideDrawer} />
          </div>
        ) : (
          <div 
            onClick={showSidedrawer}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <NavbarIcon />
          </div>
        )}
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-8">
        {/* Navigation Links */}
        <h4
          onClick={() => router.push('/')}
          className="font-medium text-gray-600 hover:text-gray-900 cursor-pointer transition-colors"
        >
          Home
        </h4>
        <h4
          onClick={() => router.push('/about')}
          className="font-medium text-gray-600 hover:text-gray-900 cursor-pointer transition-colors"
        >
          About
        </h4>
        <h4
          onClick={() => router.push('/contact')}
          className="font-medium text-gray-600 hover:text-gray-900 cursor-pointer transition-colors"
        >
          Contact
        </h4>
        
        {/* Cart - Desktop */}
        <div 
          onClick={() => router.push('/cart')} 
          className="cursor-pointer"
        >
          <CartIcon color={'#4B5563'} itemCount={cartItemCount} />
        </div>
        
        {/* User Section - Desktop */}
        <div className="flex items-center space-x-4">
          {user?.first_name && (
            <p className="font-medium text-gray-700">
              {`${user?.first_name} ${user?.last_name || user?.first_name}`}
            </p>
          )}

          {authenticated && (
            <div className="cursor-pointer relative">
              <Avatar src="" alt="" sx={{ width: 40, height: 40 }} />
            </div>
          )}
          
          {/* Auth Buttons - Desktop */}
          {!authenticated && (
            <div className="flex items-center space-x-3">
              <button 
                className="bg-transparent text-gray-800 font-medium border border-gray-300 rounded-lg px-5 py-2 hover:bg-gray-50 transition-colors" 
                onClick={setLogin}
              >
                Log in
              </button>
              <button 
                className="bg-blue-600 text-white font-medium border border-blue-600 rounded-lg px-5 py-2 hover:bg-blue-700 transition-colors" 
                onClick={setSignup}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardHeader;