'use client'
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { Cookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
import useAuth from '../hooks/useAuth';
import onics_logo from '../public/images/NANOTECH_022535.svg';

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

const Header = () => {
  useAuth();
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const router = useRouter();
  const user = cookies.get('user');
  const authenticated = useSelector((state) => state.auth.authenticated);
  const mobileSearch = useSelector((state) => state.main.mobileSearch);
  const mobileSideDrawer = useSelector((state) => state.main.mobileSideDrawer);
  const authModal = useSelector((state) => state.auth.authModal);
  const [scrolled, setScrolled] = useState(false);
  
  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.dashboard.cartItems || []);
  
  // Calculate total number of items in cart
  const cartItemCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

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
    <>
      {/* Custom CSS for gaming effects */}
      <style jsx>{`
        @keyframes glowPulse {
          0% { text-shadow: 0 0 5px rgba(0, 102, 255, 0.3), 0 0 10px rgba(0, 102, 255, 0.2); }
          50% { text-shadow: 0 0 10px rgba(0, 102, 255, 0.5), 0 0 15px rgba(0, 102, 255, 0.4); }
          100% { text-shadow: 0 0 5px rgba(0, 102, 255, 0.3), 0 0 10px rgba(0, 102, 255, 0.2); }
        }
        
        @keyframes borderGlow {
          0% { box-shadow: 0 0 5px rgba(255, 0, 102, 0.3), 0 0 10px rgba(255, 0, 102, 0.2); }
          50% { box-shadow: 0 0 10px rgba(255, 0, 102, 0.5), 0 0 15px rgba(255, 0, 102, 0.4); }
          100% { box-shadow: 0 0 5px rgba(255, 0, 102, 0.3), 0 0 10px rgba(255, 0, 102, 0.2); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }
        
        .nav-item {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .nav-item:hover {
          animation: glowPulse 2s infinite;
        }
        
        .nav-item::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 0;
          background: linear-gradient(90deg, #0066FF, #4D29CC);
          transition: width 0.3s ease;
        }
        
        .nav-item:hover::after {
          width: 100%;
        }
        
        .active-nav-item {
          color: #FFB800;
          animation: glowPulse 2s infinite;
        }
        
        .active-nav-item::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: -4px;
          left: 0;
          background: linear-gradient(90deg, #FFB800, #FF6B00);
        }
        
        .gaming-btn {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .gaming-btn:hover {
          transform: translateY(-2px);
        }
        
        .gaming-btn::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            to right, 
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: rotate(45deg);
          animation: shimmer 2s infinite;
          pointer-events: none;
        }
        
        .header-bg {
          background-color: rgba(11, 7, 25, 0.95);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        
        .scrolled {
          background-color: rgba(11, 7, 25, 0.98);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }
      `}</style>

      <nav className={`fixed top-0 left-0 right-0 z-50 header-bg ${scrolled ? 'scrolled' : ''}`}>
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 opacity-5 mix-blend-overlay" 
              ></div>
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
        </div>
        
        <div className="container mx-auto relative z-10 py-4 px-4 flex justify-between items-center">
          {/* Logo */}
          <div onClick={homeNavigate} className="cursor-pointer relative">
            <img src={onics_logo.src} alt="Logo" className="h-12 md:h-16 transition-transform duration-300 hover:scale-105" />
            {/* Optional: Add a subtle glow effect to the logo */}
            <div className="absolute -inset-1 bg-blue-500/20 rounded-full blur-xl opacity-0 hover:opacity-70 transition-opacity duration-300"></div>
          </div>
          
          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-8 relative">
            <AutoSearch />
            
            {/* Accent lines around search */}
            <div className="absolute -top-1 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
            <div className="absolute -bottom-1 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
          </div>
          
          {/* Mobile Icons */}
          <div className="flex lg:hidden items-center gap-5">
            <div
              onClick={() => dispatch(setMobileSearch(!mobileSearch))}
              className="relative group"
            >
              <SearchIcon height={25} width={30} color={'#FFF'} />
              <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur scale-0 group-hover:scale-100 transition-all duration-300"></div>
            </div>
            
            <div
              onClick={() => {
                router.push('/cart');
              }}
              className="relative group"
            >
              {window.location?.pathname === '/cart' ? (
                <CartIcon color={'#FFB800'} itemCount={cartItemCount} />
              ) : (
                <CartIcon itemCount={cartItemCount} />
              )}
              <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur scale-0 group-hover:scale-100 transition-all duration-300"></div>
            </div>
            
            {/* NavIcon */}
            {authenticated ? (
              <div className="cursor-pointer relative group">
                <div onClick={showSidedrawer} className="border-2 border-blue-500/50 rounded-full p-0.5">
                  <Avatar src="" alt="" className="bg-gradient-to-br from-blue-600 to-purple-700" />
                </div>
                <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur scale-0 group-hover:scale-100 transition-all duration-300"></div>

                <MobileSideDrawer openDrawer={mobileSideDrawer} />
              </div>
            ) : (
              <div className="relative group">
                <div onClick={showSidedrawer}>
                  <NavbarIcon />
                </div>
                <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur scale-0 group-hover:scale-100 transition-all duration-300"></div>
                <MobileSideDrawer openDrawer={mobileSideDrawer} />
              </div>
            )}
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <h4
              onClick={() => {
                dispatch(setAuthModal('DELIVERY'));
              }}
              className={`nav-item font-medium text-lg cursor-pointer ${
                authModal === 'DELIVERY' ? 'active-nav-item' : 'text-white'
              }`}
            >
              Order a bike
            </h4>
            
            <h4
              onClick={() => router.push('/about')}
              className={`nav-item font-medium text-lg cursor-pointer ${
                window.location?.pathname === '/about' ? 'active-nav-item' : 'text-white'
              }`}
            >
              About
            </h4>
            
            <h4
              onClick={() => router.push('/contact')}
              className={`nav-item font-medium text-lg cursor-pointer ${
                window.location?.pathname === '/contact' ? 'active-nav-item' : 'text-white'
              }`}
            >
              Contact
            </h4>
            
            {authenticated && (
              <h4
                onClick={() => router.push('/dashboard')}
                className={`nav-item font-medium text-lg cursor-pointer ${
                  window.location?.pathname === '/dashboard' ? 'active-nav-item' : 'text-white'
                }`}
              >
                Dashboard
              </h4>
            )}
            
            <div
              onClick={() => {
                router.push('/cart');
              }}
              className="ml-2 cursor-pointer relative group"
            >
              {window.location?.pathname === '/cart' ? (
                <CartIcon color={'#FFB800'} itemCount={cartItemCount} />
              ) : (
                <CartIcon itemCount={cartItemCount} />
              )}
              <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur scale-0 group-hover:scale-100 transition-all duration-300"></div>
            </div>
            
            <div className="ml-2 flex items-center gap-3">
              {authenticated ? (
                <>
                  {user?.first_name && (
                    <p className="text-white text-sm">{`${user?.first_name} ${user?.last_name || ''}`}</p>
                  )}
                  <div className="cursor-pointer relative group">
                    <div className="border-2 border-blue-500/50 rounded-full p-0.5">
                      <Avatar src="" alt="" className="bg-gradient-to-br from-blue-600 to-purple-700" />
                    </div>
                    <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur scale-0 group-hover:scale-100 transition-all duration-300"></div>
                  </div>
                </>
              ) : (
                <>
                  <button 
                    className="gaming-btn bg-transparent border border-blue-500 hover:border-blue-400 text-white font-medium rounded-md px-5 py-2"
                    onClick={setLogin}
                  >
                    Log in
                  </button>
                  <button 
                    className="gaming-btn bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-medium rounded-md px-5 py-2"
                    onClick={setSignup}
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        {mobileSearch && (
          <div className="absolute -bottom-16 left-0 right-0 z-20 bg-gray-900 border-t border-blue-500/30 px-4 py-3">
            <MobileSearchBar />
          </div>
        )}
      </nav>
      
      {/* Add space for fixed header */}
      <div className="h-20"></div>
    </>
  );
};

export default Header;