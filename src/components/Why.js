import LinearGr from './utils/icons/LinearGr';
import SenitalsOffice from './utils/icons/SenitalsOffice';
import WhyOptions from './utils/reusables/WhyOptions';

const styles = {
  main: 'flex flex-col items-center mt-14 mb-5 px-3 xl:px-32 overflow-hidden',
  header: 'font-extrabold text-2xl lg:text-3xl',
  sectionBody: 'flex flex-col lg:flex-row w-full',
  svgContainer: 'hidden lg:block mt-32 relative',
  imgWrapper: 'absolute -bottom-12 right-72',
  infoContainer: 'ml-1 lg:ml-auto mt-3 lg:mt-40 max-w-5xl',
};

const Why = () => {
  return (
    <div className={styles?.main}>
      <h2 className={styles?.header}>Why Are We The Best?</h2>
      <div className={styles?.sectionBody}>
        <div className={styles?.svgContainer}>
          <div className={styles?.imgWrapper}>
            <SenitalsOffice />
          </div>
          <LinearGr />
        </div>
        <div className={styles?.infoContainer}>
          <WhyOptions
            text={
              'We serve you the best of fresh, nutrient-rich and healthy groceries'
            }
          />
          <WhyOptions color={'#FFB800'} text={'Swift Delivery'} />
          <WhyOptions text={'Great Refund Policy'} />
          <WhyOptions color={'#FFB800'} text={'Wide coverage Map'} />
        </div>
      </div>
    </div>
  );
};

export default Why;
