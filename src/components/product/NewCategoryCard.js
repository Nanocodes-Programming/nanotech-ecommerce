import useSWR from 'swr';
import { API_URL } from '../../constants/api';

const NewCategoryCard = ({ category, setProdCat, prodCat }) => {
  const url = `${API_URL}/category/${category?.slug}`;
  const { data: productCategory } = useSWR(url);

  return (
    <div
      onClick={() => setProdCat(category?.slug)}
      className="w-full h-14 flex items-center px-2 gap-2 bg-white shadow-md rounded-md cursor-pointer min-w-[12rem] m-1"
    >
      {productCategory !== undefined && (
        <img
          src={`${productCategory[0]?.image}`}
          alt="onics"
          width={30}
          className="object-cover"
        />
      )}
      <p
        className={
          prodCat === category?.slug
            ? 'font-semibold text-[#FFB800]'
            : 'font-semibold text-gray-800'
        }
      >
        {category?.name}
      </p>
    </div>
  );
};

export default NewCategoryCard;
