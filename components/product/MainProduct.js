import { useState } from 'react';
import useSWR from 'swr';
import { API_URL } from '../../constants/api';
import fresh from '../../images/switch.png';
import groceryImg from '../../images/grocery-png.png';
import AutoSearch from '../AutoSearch';
import MobileSearchBar from '../utils/reusables/MobileSearchBar';
import NewCategoryCard from './NewCategoryCard';
import ProductsSection from './ProductsSection';

const MainProduct = () => {
  const [prodCat, setProdCat] = useState('all');

  const url = `${API_URL}/category/`;
  const { data: categories } = useSWR(url);

  return (
    <div className="flex flex-col mb-[12rem] gap-5">
      <div className="absolute right-0 -z-10">
        <img src={fresh.src} alt="" width={300} />
      </div>
      <div className="w-full flex flex-col md:flex-row items-center p-3 gap-10">
        <p className="xl:ml-28 lg:ml-24 md:ml-12 font-bold text-3xl">
          Shop by category
        </p>
        <div className="hidden md:block">
          <AutoSearch />
        </div>

        <MobileSearchBar />
      </div>

      <div className="flex flex-col lg:flex-row items-start w-[90vw] md:w-[83vw] mx-auto gap-10">
        {/* Categories sidebar - removed overflow and made it neat */}
        <div className="w-full lg:w-[15rem] mt-1 flex flex-row lg:flex-col items-center gap-2">
          <div
            onClick={() => setProdCat('all')}
            className={`w-full h-14 flex items-center px-3 gap-2 rounded-md cursor-pointer min-w-[12rem] transition-all duration-200 ${
              prodCat === 'all' 
                ? 'bg-white shadow-md border-l-2 border-[#FFB800]' 
                : 'bg-white shadow hover:shadow-md'
            }`}
          >
            <img
              src={groceryImg.src}
              alt="all gadgets"
              width={30}
              className="object-cover"
            />

            <p
              className={
                prodCat === 'all'
                  ? 'font-semibold text-[#FFB800]'
                  : 'font-semibold text-gray-800'
              }
            >
              All gadgets
            </p>
          </div>
          
          {/* Limit number of visible categories if needed */}
          {categories?.slice(0, 8).map((category) => (
            <NewCategoryCard
              key={category.id || category._id || category.slug || `category-${Math.random()}`}
              category={category}
              setProdCat={setProdCat}
              prodCat={prodCat}
            />
          ))}
          
          {/* Optional "View More" button if categories exceed 8 */}
          {categories && categories.length > 8 && (
            <div className="w-full text-center py-2 text-blue-600 hover:text-blue-800 cursor-pointer font-medium">
              View more
            </div>
          )}
        </div>

        {/* Products section */}
        <ProductsSection prodCat={prodCat} />
      </div>
    </div>
  );
};

export default MainProduct;