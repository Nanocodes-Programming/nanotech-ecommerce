import grocery2 from '@/images/image-removebg.png';
import grocery from '@/images/Hero.png';
import Header from './Header';
import Ellipse1 from './utils/icons/Ellipse1';
import Ellipse2 from './utils/icons/Ellipse2';

const styles = {
  main: 'relative flex flex-col h-screen w-screen bg-gradient-to-br from-slate-900 via-blue-800 to-indigo-700 shadow-xl px-3 xl:px-32 z-20 overflow-hidden',
  groceryImg:
    'opacity-40 object-cover max-h-full max-w-3xl absolute -right-20 lg:right-3 bottom-3 -z-10 ',
  ellipse1: 'absolute -z-10 bottom-7 -left-1 xl:left-72 max-h-full opacity-40',
  ellipse2: 'absolute -z-10 bottom-10 -left-7 xl:left-60 max-h-full opacity-40',
  text: 'text-white font-bold text-3xl md:text-5xl mt-32 lg:mt-60 tracking-wider leading-tight',
  _groceryImg:
    'object-cover max-h-full max-w-3xl absolute -right-16 lg:right-10 xl:right-20 top-60 -z-10 opacity-70',
  highlight: 'text-cyan-300',
  subtitle: 'text-blue-100 text-lg md:text-xl mt-4 max-w-lg font-light',
  ctaButton: 'bg-cyan-500 hover:bg-cyan-600 transition-colors duration-300 text-white font-medium rounded-full px-8 py-3 mt-8 shadow-lg inline-block',
  glow: 'absolute w-40 h-40 bg-blue-500 rounded-full filter blur-3xl opacity-20 -z-10',
};

const Banner = () => {
  return (
    <div className={styles.main}>
      <Header />
      
      {/* Background elements */}
      <div className={`${styles.glow} top-20 right-20`}></div>
      <div className={`${styles.glow} bottom-20 left-20`}></div>
      <img src={grocery.src} alt="" className={styles.groceryImg} />
      <div className={styles.ellipse1}>
        <Ellipse1 />
      </div>
      <div className={styles.ellipse2}>
        <Ellipse2 />
      </div>

      {/* Content */}
      <div className="md:-mt-5 max-w-2xl z-10">
        <h3 className={styles.text}>
          Next-Gen <span className={styles.highlight}>Tech Gadgets</span> Delivered to Your Doorstep
        </h3>
        <p className={styles.subtitle}>
          Discover the latest innovations in technology with our premium selection of devices, accessories, and smart solutions.
        </p>
        <a href="#shop" className={styles.ctaButton}>
          Explore Collection
        </a>
      </div>

      <img src={grocery2.src} alt="" className={styles._groceryImg} />
    </div>
  );
};

export default Banner;