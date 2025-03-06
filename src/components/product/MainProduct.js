import { useState } from 'react';
import useSWR from 'swr';
import { API_URL } from '../../constants/api';
import fresh from '../../images/fresh-fruits1.png';
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
        <img src={fresh} alt="" width={300} />
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
        <div className="w-full lg:w-[15rem] mt-1 flex flex-row lg:flex-col items-center gap-2 max-h-[25rem] overflow-scroll no-scrollbar">
          <div
            onClick={() => setProdCat('all')}
            className="w-full h-14 flex items-center px-2 gap-2 bg-white shadow-md rounded-md cursor-pointer min-w-[12rem] m-1"
          >
            <img
              src={groceryImg}
              alt="onics"
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
              All products
            </p>
          </div>
          {categories?.map((category) => (
            <NewCategoryCard
              category={category}
              setProdCat={setProdCat}
              prodCat={prodCat}
            />
          ))}
        </div>

        <ProductsSection prodCat={prodCat} />
      </div>
    </div>
  );
};

export default MainProduct;
