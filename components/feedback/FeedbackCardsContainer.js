import FeedbackCard from '../utils/cards/FeedbackCard';

const FeedbackCardsContainer = () => {
  return (
    <div className="flex bg-[#2bea0c12] py-14 my-10 px-7 xl:px-32">
      <div className="flex gap-5 md:gap-14 overflow-x-scroll no-scrollbar">
        <FeedbackCard name={'Robez Estabee'} />
        <FeedbackCard name={'Jekins Pheobe'} />
      </div>
    </div>
  );
};

export default FeedbackCardsContainer;
