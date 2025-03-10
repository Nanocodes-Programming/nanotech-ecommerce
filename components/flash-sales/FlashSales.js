import FlashCardsContainer from './FlashCardsContainer';

const styles = {
  main: 'flex items-center gap-2 ml-auto mr-auto',
  titleBar: 'w-[6rem] md:w-48 h-[1.5px] bg-gray-500',
  title: 'text-2xl font-semibold',
  countWrapper: 'flex items-center gap-3 md:gap-7 mt-8 ml-auto mr-auto',
};

const FlashSales = () => {
  return (
    <div className="flex flex-col mb-5">
      
      {/* <div className={styles?.countWrapper}>
        <Countdown count={'02'} time={'DAYS'} />
        <Countdown count={'14'} time={'HOURS'} />
        <Countdown count={'26'} time={'MINS'} />
      </div> */}
      <FlashCardsContainer />
    </div>
  );
};

export default FlashSales;
