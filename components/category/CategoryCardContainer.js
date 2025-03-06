import useSWR from 'swr';

import { API_URL } from '../../constants/api';
import CategoryCard from '../utils/cards/CategoryCard';
import CategoryCardSkeleton from '../utils/skeletons/CategoryCardSkeleton';

const styles = {
  main: 'flex items-center justify-evenly py-5 my-10',
  arrowWrapper: 'bg-black py-2 px-3 rounded-[50%] shadow-lg cursor-pointer',
  categoryCardsContainer:
    'flex gap-8 overflow-x-scroll no-scrollbar max-w-[85vw]',
  viewBtn:
    'ml-auto text-[#339944] bg-white border-2 border-[#339944] rounded-xl px-5 py-2 -mt-5 mb-3 mr-5 md:mr-16 lg:mr-20 xl:mr-28 font-semibold',
};

const CategoryCardContainer = () => {
  const url = `${API_URL}/category/`;
  const { data: products } = useSWR(url);

  return (
    <div className="flex flex-col">
      <div className={styles?.main}>
        {/* <div className={styles?.arrowWrapper}>
          <BackArrowIcon />
        </div> */}
        <div className={styles?.categoryCardsContainer}>
          {products?.map((product) => (
            <CategoryCard product={product} key={product.id} />
          ))}
          {products === undefined && <CategoryCardSkeleton />}
        </div>
        {/* <div className={styles?.arrowWrapper}>
          <ForwardArrowIcon />
        </div> */}
      </div>
      {/* <button className={styles?.viewBtn}>VIEW ALL</button> */}
    </div>
  );
};

export default CategoryCardContainer;
