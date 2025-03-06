import PlayStoreSvg from './utils/svgs/PlayStoreSvg.svg';
import mobileGreenSvg from './utils/svgs/mobile-green-bg.svg';
import mobilePinkSvg from './utils/svgs/mobile-pink-bg.svg';
import mobileSvg from './utils/svgs/mobile.svg';

const styles = {
  main: 'flex flex-col justify-between -mt-44 md:mt-0',
  titleContainer:
    'flex flex-col-reverse md:flex-row justify-between gap-2 mx-3 xl:mx-32 mb-24 md:mb-52',
  svgWrapper: 'mr-auto ml-auto md:ml-0 md:mr-0 mt-5 relative',
  pinkSvg:
    'hidden lg:inline-block absolute -top-2 xl:top-5 right-0 xl:right-20',
  _mobileSvg:
    'absolute -top-28 lg:-top-36 xl:-top-28 right-5 md:right-16 xl:right-24',
  titleWrapper:
    'text-center md:text-left mr-auto ml-auto md:mr-0 md:-ml-20 xl:-ml-32 xl:mr-20 mb-28 md:mb-0',
  descriptionText: 'text-[#000000cc] font-semibold text-xl lg:text-2xl',
  btnContainer: 'flex ml-auto mr-auto gap-3 md:gap-7 px-5 z-20',
  btnWrapper:
    'cursor-pointer flex justify-between items-center py-3 px-2 md:px-3 gap-3 bg-black rounded-xl',
  downloadText: 'text-[#ffffffcc] text-sm md:text-lg font-semibold',
  text: 'text-white text-base md:text-lg font-semibold',
};

const MobileDownloadSection = () => {
  const handlePlayDownload = () => {
    window.open(
      'https://play.google.com/store/apps/details?id=com.nanocodes.OnicsStore',
      '_blank'
    );
  };

  return (
    <div className={styles?.main}>
      <div className={styles?.titleContainer}>
        <div className={styles?.svgWrapper}>
          <img src={mobileGreenSvg} alt="" />
          <img src={mobilePinkSvg} alt="" className={styles?.pinkSvg} />
          <img src={mobileSvg} alt="" className={styles?._mobileSvg} />
        </div>
        <div className={styles?.titleWrapper}>
          <p className="font-bold text-3xl lg:text-5xl pb-7">
            Download Our Mobile App
          </p>
          <p className={styles?.descriptionText}>
            Simple and efficient to use!
          </p>
        </div>
      </div>
      <div className={styles?.btnContainer}>
        {/* <div className={styles?.btnWrapper}>
          <AppleLogo />
          <div className="flex-1">
            <p className={styles?.downloadText}>Download on the</p>
            <p className={styles?.text}>App store</p>
          </div>
        </div> */}
        <div onClick={handlePlayDownload} className={styles?.btnWrapper}>
          <img src={PlayStoreSvg} alt="" />
          <div className="flex-1">
            <p className={styles?.downloadText}>Download on the</p>
            <p className={styles?.text}>Play store</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDownloadSection;
