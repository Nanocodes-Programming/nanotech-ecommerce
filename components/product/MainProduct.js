import { useState } from 'react';
import fresh from '../../images/ps5.webp';

import AutoSearch from '../AutoSearch';
import MobileSearchBar from '../utils/reusables/MobileSearchBar';
import ProductsSection from './ProductsSection';

const MainProduct = ({category}) => {
  return (
    <div className="flex flex-col mb-[12rem] gap-5 max-w-7xl mx-auto relative">
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

      <div className="w-[90vw] md:w-[83vw] max-w-7xl  mx-auto">
        {/* Products section with integrated horizontal category filters */}
        <ProductsSection category={category} />
      </div>
    </div>
  );
};

export default MainProduct;