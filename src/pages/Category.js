import useSWR from 'swr';
import Header from '../components/Header';
import FlashCard from '../components/utils/cards/FlashCard';
import { API_URL } from '../constants/api';

const Category = () => {
  const windowUrl = window.location.pathname;
  const parts = windowUrl.split('/');
  const slug = parts.slice(2).join('/');

  const url = `${API_URL}/category/${slug}`;
  const { data: productsCategory } = useSWR(url);

  return (
    <div className="min-h-[90vh] overflow-y-scroll no-scrollbar">
      <div className="bg-gradient-to-br from-green-800 via-green-500 to-green-600 shadow-md px-3 xl:px-32">
        <Header />
      </div>
      <div className="px-3 xl:px-32">
        {productsCategory && (
          <p className="text-xl lg:text-2xl font-semibold mt-7 -mb-3 capitalize">
            {productsCategory[0]?.category?.name}
          </p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-20 max-w-[85vw]">
          {productsCategory?.map((productCategory) => (
            <FlashCard product={productCategory} key={productCategory?.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
