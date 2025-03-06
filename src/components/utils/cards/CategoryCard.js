import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { API_URL } from '../../../constants/api';
import LoadingIcon from '../icons/LoadingIcon';

const styles = {
  main: 'flex flex-col items-center min-w-[16rem] rounded-3xl bg-white shadow-md p-3 m-1 cursor-pointer',
  text: 'font-semibold text-lg mt-[2px] capitalize text-[#333]',
};

const CategoryCard = ({ product }) => {
  const navigate = useNavigate();

  const url = `${API_URL}/category/${product?.slug}`;
  const { data: productCategory } = useSWR(url);

  return (
    <div
      onClick={() =>
        navigate(`/category/${productCategory[0]?.category?.slug}`)
      }
      className={styles?.main}
    >
      <div className="bg-transparent mt-auto mb-auto rounded-3xl max-h-44 overflow-hidden">
        {productCategory !== undefined && (
          <img
            src={`${productCategory[0]?.image}`}
            alt="onics"
            width={200}
            className="object-cover"
          />
        )}
        {productCategory === undefined && <LoadingIcon />}
      </div>
      <p className={styles?.text}>{product?.name}</p>
    </div>
  );
};

export default CategoryCard;
