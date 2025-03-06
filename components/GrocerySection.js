import useSWR from 'swr';
import { API_URL } from '../constants/api';
import GroceryCard from './utils/cards/GroceryCard';
import GroceryCardSkeleton from './utils/skeletons/GroceryCardSkeleton';

const styles = {
  title: 'mr-auto ml-auto font-bold text-2xl mb-7',
  groceryCardWrapper:
    'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mx-3 md:mx-10 xl:mx-28',
  seeBtn:
    'mr-auto ml-auto text-[#339944] bg-white border-2 border-[#339944] rounded-xl px-5 py-2 my-5 font-semibold',
};

const GrocerySection = () => {
  const url = `${API_URL}/products/`;
  const { data: products } = useSWR(url);

  return (
    <div className="flex flex-col mb-52 md:mb-40">
      <p className={styles?.title}>GROCERY DISPLAY</p>
      <div className={styles?.groceryCardWrapper}>
        {products?.map((product) => (
          <GroceryCard product={product} key={product.id} />
        ))}
        {products === undefined && <GroceryCardSkeleton />}
      </div>
      {/* {products && <button className={styles?.seeBtn}>SEE MORE</button>} */}
    </div>
  );
};

export default GrocerySection;
