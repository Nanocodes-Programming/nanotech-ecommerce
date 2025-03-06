const styles = {
  main: 'flex flex-col items-center bg-[#1E1A1A] rounded-lg px-6 py-[0.15rem] w-[7rem] md:w-52 lg:w-60 shadow-md',
  count: 'text-white font-extrabold text-lg',
  time: 'text-gray-500 font-extrabold text-lg',
};

const Countdown = ({ count, time }) => {
  return (
    <div className={styles?.main}>
      <h3 className={styles?.count}>{count}</h3>
      <h3 className={styles?.time}>{time}</h3>
    </div>
  );
};

export default Countdown;
