// app/category/[slug]/page.js
import Header from '../../../components/Header';
import FlashCard from '../../../components/utils/cards/CleanProductCard';
import { API_URL } from '../../../constants/api';

async function getCategoryProducts(slug) {
  try {
    const res = await fetch(`${API_URL}/category/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) {
      throw new Error('Failed to fetch category products');
    }
    return res.json();
  } catch (error) {
    console.error('Error loading category products:', error);
    return [];
  }
}

export default async function Category({ params }) {
  const { slug } = params;
  const productsCategory = await getCategoryProducts(slug);

  return (
    <div className="min-h-[90vh] overflow-y-scroll no-scrollbar">
      <div className="bg-gradient-to-br from-green-800 via-green-500 to-green-600 shadow-md px-3 xl:px-32">
        <Header />
      </div>
      <div className="px-3 xl:px-32">
        {productsCategory && productsCategory.length > 0 && (
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
}

// If you need to generate metadata for the page
export async function generateMetadata({ params }) {
  const { slug } = params;
  const productsCategory = await getCategoryProducts(slug);
  
  const categoryName = productsCategory && productsCategory.length > 0 
    ? productsCategory[0]?.category?.name 
    : slug;
  
  return {
    title: `${categoryName} | Your Store Name`,
    description: `Browse our collection of ${categoryName} products`,
  };
}