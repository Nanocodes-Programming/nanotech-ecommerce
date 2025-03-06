'use client'
import { useEffect } from 'react';
import { Cookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Banner from '../../components/Banner';
import MobileDownloadSection from '../../components/MobileDownloadSection';
import Why from '../../components/Why';
import FlashSales from '../../components/flash-sales/FlashSales';
import MainProduct from '../../components/product/MainProduct';
import { customLogoutUser } from '../../store/actions/auth_actions';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const cookies = new Cookies();
    const expDate = cookies.get('date');
    const token = cookies.get('token');

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const currentDate = new Date().getTime();
    const expiryDate = new Date(expDate).getTime() * 1000;
    const isExpired = currentDate < expiryDate;

    // console.log('active token');
    if (isExpired !== true) {
      dispatch(customLogoutUser(navigate, config));
    }
  }, [dispatch, navigate]);
  // useAuth();

  return (
    <div>
      <Banner />
      <Why />
      <FlashSales />
      <MainProduct />
      {/* <CategorySection />
      <GrocerySection /> */}
      {/* <Feedback /> */}
      <MobileDownloadSection />
    </div>
  );
};

export default Home;
