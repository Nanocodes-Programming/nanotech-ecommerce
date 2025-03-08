import grocery2 from '@/images/grocery-png.png';
import grocery from '@/images/transparent-background-removebg.png';
import Header from './Header';
import Ellipse1 from './utils/icons/Ellipse1';
import Ellipse2 from './utils/icons/Ellipse2';

const styles = {
  main: 'relative flex flex-col h-screen w-screen bg-gradient-to-br from-green-800 via-green-500 to-green-600 shadow-lg px-3 xl:px-32 z-20 opacity-90 overflow-hidden',
  groceryImg:
    'opacity-20 object-cover max-h-full max-w-3xl absolute -right-20 lg:right-3 bottom-3 -z-10',
  ellipse1: 'absolute -z-10 bottom-7 -left-1 xl:left-72 max-h-full',
  ellipse2: 'absolute -z-10 bottom-10 -left-7 xl:left-60 max-h-full',
  text: 'text-white font-semibold text-3xl md:text-5xl mt-32 lg:mt-60 tracking-wider',
  _groceryImg:
    'object-cover max-h-full max-w-3xl absolute -right-16 lg:right-10 xl:right-20 top-60 -z-10',
};

const Banner = () => {
  return (
    <div className={styles?.main}>
      <Header />
      <img src={grocery.src} alt="" className={styles?.groceryImg} />
      <div className={styles?.ellipse1}>
        <Ellipse1 />
      </div>
      <div className={styles?.ellipse2}>
        <Ellipse2 />
      </div>

      <div className="md:-mt-5 max-w-md">
        <h3 className={styles?.text}>
          Buy your groceries and have it delivered to your doorstep with ease.
        </h3>
      </div>

      <img src={grocery2.src} alt="" className={styles?._groceryImg} />
      {/* top-72 */}
    </div>
  );
};

export default Banner;
