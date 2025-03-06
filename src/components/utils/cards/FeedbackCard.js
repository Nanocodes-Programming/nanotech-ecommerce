import { Avatar } from '@mui/material';
import RatingStar from '../icons/RatingStar';

const styles = {
  main: 'flex flex-col justify-between min-w-[20rem] max-w-[20rem] h-[18rem] bg-white rounded-lg shadow-md p-7 my-2',
  starContainer: 'flex justify-between items-center',
  feedbackText: 'max-w-[16rem] text-[#000000cc] text-lg',
  userInfo: 'ml-auto flex items-center gap-1',
};

const FeedbackCard = ({ name }) => {
  return (
    <div className={styles?.main}>
      <div className={styles?.starContainer}>
        <div className="flex">
          <RatingStar />
          <RatingStar />
          <RatingStar />
          <RatingStar />
          <RatingStar />
        </div>
        <p className="text-[#00000099] text-xl">May 15, 2023</p>
      </div>
      <p className={styles?.feedbackText}>
        Great, super quick delivery, great service, good attention to detail and
        very helpful staff. Thank you grosa.{' '}
      </p>
      <div className={styles?.userInfo}>
        <Avatar src="" alt="" />
        <p className="text-[#000000cc] text-lg">{name}</p>
      </div>
    </div>
  );
};

export default FeedbackCard;
