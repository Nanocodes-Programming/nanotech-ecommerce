import useSWR from 'swr';
import { API_URL } from '../../constants/api';
import FlashCard from '../utils/cards/FlashCard';
import FlashCardSkeleton from '../utils/skeletons/FlashCardSkeleton';

const styles = {
  main: 'flex items-center justify-evenly bg-[#2bea0c12] py-5 my-10',
  arrow: 'bg-black py-2 px-3 rounded-[50%] shadow-lg cursor-pointer',
  flashCardWrapper: 'flex gap-8 overflow-x-scroll no-scrollbar max-w-[85vw]',
  viewBtn:
    'ml-auto text-[#339944] bg-white border-2 border-[#339944] rounded-xl px-5 py-2 -mt-5 mb-3 mr-5 md:mr-16 lg:mr-20 xl:mr-28 font-semibold',
};

const FlashCardsContainer = () => {
  const url = `${API_URL}/products?is_pack=true`;
  const { data: products } = useSWR(url);

  return (
    <div className="flex flex-col">
      <div className={styles?.main}>
        {/* {products && (
          <div className={styles?.arrow}>
            <BackArrowIcon />
          </div>
        )} */}
        <div className={styles?.flashCardWrapper}>
          {products?.map((product) => (
            <FlashCard product={product} key={product._id} />
          ))}
          {products === undefined && <FlashCardSkeleton />}
        </div>
        {/* {products && (
          <div className={styles?.arrow}>
            <ForwardArrowIcon />
          </div>
        )} */}
      </div>
      {/* <button className={styles?.viewBtn}>VIEW ALL</button> */}
    </div>
  );
};

export default FlashCardsContainer;
