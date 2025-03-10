import axios from 'axios';
import { Cookies } from 'react-cookie';
import useSWR from 'swr';
import { API_URL } from '../../constants/api';
import FlashCard from '../utils/cards/FlashCard';
import FlashCardSkeleton from '../utils/skeletons/FlashCardSkeleton';

const fetcher = async (url, authDetails) => {
  const res = await axios.get(url, authDetails);
  return res.data;
};

const DashboardCards = ({ products }) => {
  const cookies = new Cookies();
  const token = cookies.get('token');

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const favouriteUrl = `${API_URL}/favourite`;
  const { data: favourites } = useSWR(favouriteUrl, (url) =>
    fetcher(url, config)
  );

  // Function to scroll a container left
  const scrollLeft = (containerId) => {
    const container = document.getElementById(containerId);
    if (container) {
      container.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  // Function to scroll a container right
  const scrollRight = (containerId) => {
    const container = document.getElementById(containerId);
    if (container) {
      container.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex-1 max-h-full md:max-w-[70vw] lg:max-w-[45vw] xl:max-w-[52vw] overflow-y-auto py-4">
      {/* Favorites Section */}
      {favourites?.length > 0 && (
  <div className="mb-10">
    <div className="flex justify-between items-center mb-4">
      <p className="font-semibold text-gray-800 text-xl">
        Your favorites groceries
      </p>
      <div className="flex gap-2">
        <button 
          onClick={() => scrollLeft('favorites-container')}
          className="p-1.5 rounded-full bg-white shadow-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <button 
          onClick={() => scrollRight('favorites-container')}
          className="p-1.5 rounded-full bg-white shadow-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>

    <div 
      id="favorites-container"
      className="flex gap-6 pb-6 px-1 overflow-x-auto scroll-smooth"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {favourites?.map((favourite) => (
        <div key={favourite?._id} className="flex-shrink-0">
          <FlashCard product={favourite?.product} />
        </div>
      ))}
      {favourites === undefined && (
        <>
          <div className="flex-shrink-0"><FlashCardSkeleton /></div>
          <div className="flex-shrink-0"><FlashCardSkeleton /></div>
          <div className="flex-shrink-0"><FlashCardSkeleton /></div>
        </>
      )}
    </div>
  </div>
)}

      <div className="mt-8 mb-6">
        <div className="flex justify-between items-center mb-4">
          <p className="font-semibold text-gray-800 text-xl">
            Recommended groceries
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => scrollLeft('recommended-container')}
              className="p-1.5 rounded-full bg-white shadow-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={() => scrollRight('recommended-container')}
              className="p-1.5 rounded-full bg-white shadow-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <div
          id="recommended-container"
          className="flex gap-6 pb-6 px-1 overflow-x-auto scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products?.map((product) => (
            <div key={product._id} className="flex-shrink-0">
              <FlashCard product={product} />
            </div>
          ))}
          {products === undefined && (
            <>
              <div className="flex-shrink-0"><FlashCardSkeleton /></div>
              <div className="flex-shrink-0"><FlashCardSkeleton /></div>
              <div className="flex-shrink-0"><FlashCardSkeleton /></div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        #favorites-container::-webkit-scrollbar,
        #recommended-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default DashboardCards;