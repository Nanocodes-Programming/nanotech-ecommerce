import fresh2 from '../../images/fresh-fruits2.png';
import FeedbackCardsContainer from './FeedbackCardsContainer';

const styles = {
  main: 'relative flex flex-col mt-20 mb-52',
  imgWrapper: 'absolute left-0 -top-44 -z-10',
  titleWrapper: 'flex items-center gap-2 ml-auto mr-auto',
  titleBar: 'w-[6rem] md:w-48 h-[1.5px] bg-gray-500',
};

const Feedback = () => {
  return (
    <div className={styles?.main}>
      <div className={styles?.imgWrapper}>
        <img src={fresh2.src} alt="" width={300} />
      </div>
      <div className={styles?.titleWrapper}>
        <div className={styles?.titleBar} />
        <div className="text-2xl font-semibold">Happy Clients</div>
        <div className={styles?.titleBar} />
      </div>

      <FeedbackCardsContainer />
    </div>
  );
};

export default Feedback;
