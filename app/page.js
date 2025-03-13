'use client';
import { useState, useEffect } from 'react';
import { Cookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Banner from '../components/Banner';
import MobileDownloadSection from '../components/MobileDownloadSection';
import Why from '../components/Why';
import FlashSales from '../components/flash-sales/FlashSales';
import MainProduct from '../components/product/MainProduct';
import { customLogoutUser } from '../store/actions/auth_actions';
// import PromotionalBannerCarousel from '@/components/PromotionalBannerCarousel';


export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

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
      // Updated to use Next.js router
      const navigateFunction = (path) => router.push(path);
      dispatch(customLogoutUser(navigateFunction, config));
    }
  }, [dispatch, router]);

  const [selectedCategory, setSelectedCategory] = useState('all');

  // This function will be passed to Banner component
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <Banner onCategoryChange={handleCategoryChange}/>
      {/* <PromotionalBannerCarousel /> */}
      <FlashSales />
      <MainProduct category={selectedCategory} />
      <MobileDownloadSection />
    </div>
  );
}