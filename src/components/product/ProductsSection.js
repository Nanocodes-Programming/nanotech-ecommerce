import useSWR from 'swr';
import { API_URL } from '../../constants/api';
import GroceryCard from '../utils/cards/GroceryCard';
import GroceryCardSkeleton from '../utils/skeletons/GroceryCardSkeleton';

const ProductsSection = ({ prodCat }) => {
  const productsUrl =
    prodCat === 'all'
      ? `${API_URL}/products/`
      : `${API_URL}/category/${prodCat}`;
  const { data: products } = useSWR(productsUrl);

  return (
    <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 overflow-scroll no-scrollbar max-h-[45rem]">
      {products?.map((product) => (
        <GroceryCard product={product} key={product.id} />
      ))}

      {products === undefined && <GroceryCardSkeleton />}
    </div>
  );
};

export default ProductsSection;
