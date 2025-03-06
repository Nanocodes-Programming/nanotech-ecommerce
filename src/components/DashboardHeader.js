import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';

import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import onics_logo from '../images/onicss.png';
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

const styles = {
  main: 'flex justify-between lg:justify-evenly items-center bg-transparent relative pt-4 pb-1 md:pt-5 md:pb-5 pr-3',
  search:
    'hidden flex-1 bg-white md:flex justify-between items-center border rounded-lg border-amber-400 p-2 h-9 xl:max-w-lg mx-0 md:mx-16 xl:mx-36',
  searchInput: 'flex-1 border-none outline-none',
  textContainer: 'hidden lg:flex justify-between md:items-center md:z-auto',
  headerText: 'font-semibold text-lg mr-6 cursor-pointer',
  loginBtn:
    'bg-transparent text-white font-bold items-center border rounded-xl border-white px-6 py-2 mr-4',
  signupBtn:
    'bg-white text-green-600 font-bold items-center border rounded-xl border-white px-6 py-2',
};

const DashboardHeader = () => {
  useAuth();
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const navigate = useNavigate();
  const user = cookies.get('user');
  const authenticated = useSelector((state) => state.auth.authenticated);
  const mobileSearch = useSelector((state) => state.main.mobileSearch);
  const mobileSideDrawer = useSelector((state) => state.main.mobileSideDrawer);

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
    navigate('/');
  };

  return (
    <nav className={styles.main}>
      <div
        onClick={homeNavigate}
        className="inline-block md:hidden cursor-pointer ml-2"
      >
        <img src={onics_logo} alt="" className="h-16" />
      </div>
      {/* <div className={styles.search}>
        <input placeholder="Search" className={styles.searchInput} />
        <SearchIcon height={15} width={20} />
      </div> */}
      <div className="mr-auto ml-auto hidden md:flex md:z-auto">
        <AutoSearch />
      </div>
      <div className="lg:hidden flex items-center gap-3">
        <div
          onClick={() => dispatch(setMobileSearch(!mobileSearch))}
          className="block md:hidden"
        >
          <SearchIcon height={25} width={30} />
        </div>
        <div onClick={() => navigate('/cart')}>
          <CartIcon color={'#6b7280cc'} />
        </div>
        {mobileSearch && (
          <div className="absolute -bottom-8 left-4">
            <MobileSearchBar />
          </div>
        )}

        {/* NavIcon */}
        {authenticated ? (
          <div className="cursor-pointer relative">
            <div onClick={showSidedrawer}>
              <Avatar src="" alt="" />
            </div>
            <MobileSideDrawer openDrawer={mobileSideDrawer} />
          </div>
        ) : (
          <NavbarIcon />
        )}
      </div>
      <div className={styles.textContainer}>
        <h4
          onClick={() => navigate('/')}
          className={`${styles.headerText} text-gray-500`}
        >
          Home
        </h4>
        <h4
          onClick={() => navigate('/about')}
          className={`${styles.headerText} text-gray-500`}
        >
          About
        </h4>
        <h4
          onClick={() => navigate('/contact')}
          className={`${styles.headerText} text-gray-500`}
        >
          Contact
        </h4>
        <div onClick={() => navigate('/cart')} className="mr-8 cursor-pointer">
          <CartIcon color={'#6b7280cc'} />
        </div>
        <div className="flex justify-between items-center gap-2">
          {user?.first_name && (
            <p>{`${user?.first_name} ${user?.first_name}`}</p>
          )}

          {authenticated && (
            <div className="cursor-pointer relative lg:mr-3 xl:mr-5">
              <div>
                <Avatar src="" alt="" />
              </div>
            </div>
          )}
        </div>
        <div className={styles.textContainer}>
          {!authenticated && (
            <button className={styles.loginBtn} onClick={setLogin}>
              Log in
            </button>
          )}
          {!authenticated && (
            <button className={styles.signupBtn} onClick={setSignup}>
              Register
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardHeader;
