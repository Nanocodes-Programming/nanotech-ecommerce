import fresh from '../../images/fresh-fruits1.png';
import CategoryCardContainer from './CategoryCardContainer';

const styles = {
  main: 'relative flex flex-col justify-between my-5',
  titleWrapper: 'flex justify-center md:justify-start',
  title: 'ml-3 xl:ml-32 max-w-xs font-extrabold text-4xl text-center',
  categoryWrapper: 'flex flex-col mt-10 md:mt-20',
  categoryText: 'ml-3 xl:ml-32 font-bold text-3xl',
};

const CategorySection = () => {
  return (
    <div className={styles?.main}>
      <div className="absolute right-0 -z-10">
        <img src={fresh} alt="" width={300} />
      </div>
      <div className={styles?.titleWrapper}>
        <p className={styles?.title}>Enjoy your favorite grocery items</p>
      </div>
      <div className={styles?.categoryWrapper}>
        <p className={styles?.categoryText}>Shop by category</p>
        <CategoryCardContainer />
      </div>
    </div>
  );
};

export default CategorySection;
