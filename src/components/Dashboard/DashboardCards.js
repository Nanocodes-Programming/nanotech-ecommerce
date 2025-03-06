import axios from 'axios';
import { Cookies } from 'react-cookie';
import useSWR from 'swr';
import { API_URL } from '../../constants/api';
import FlashCard from '../utils/cards/FlashCard';
import FlashCardSkeleton from '../utils/skeletons/FlashCardSkeleton';

// md:max-w-[70vw] lg:max-w-[45vw] xl:max-w-[52vw]

const fetcher = async (url, authDetails) => {
  const res = await axios.get(url, authDetails);
  return res.data;
};

const DashboardCards = ({ products }) => {
  const cookies = new Cookies();
  const token = cookies.get('token');
  // console.log(product);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const favouriteUrl = `${API_URL}/favourite`;
  const { data: favourites } = useSWR(favouriteUrl, (url) =>
    fetcher(url, config)
  );

  return (
    <div className="flex-1 mb-0 lg:mb-9 max-h-full lg:max-h-full md:max-w-[70vw] lg:max-w-[45vw] xl:max-w-[52vw] overflow-y-scroll no-scrollbar">
      <div>
        {favourites?.length > 0 && (
          <p className="font-semibold text-gray-500 text-xl -mb-4">
            Your favorite groceries
          </p>
        )}
        <div className="flex gap-3 overflow-x-scroll no-scrollbar">
          {favourites?.map((favourite) => (
            <FlashCard product={favourite?.product} key={favourite?._id} />
          ))}
          {favourites === undefined && <FlashCardSkeleton />}
        </div>
      </div>
      <div>
        <p className="font-semibold text-gray-500 text-xl -mb-4">
          Recommended groceries
        </p>
        <div className="flex gap-3 overflow-x-scroll no-scrollbar">
          {products?.map((product) => (
            <FlashCard product={product} key={product._id} />
          ))}
          {products === undefined && <FlashCardSkeleton />}
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
