import EllipseDot from '../icons/EllipseDot';

const styles = {
  infoWrapper:
    'flex items-center gap-3 shadow-md px-6 py-5 mb-5 rounded-sm text-[#000000bf] font-semibold',
};

const WhyOptions = ({ color, text }) => {
  return (
    <div className={styles?.infoWrapper}>
      <div className="min-w-max">
        <EllipseDot color={color} />
      </div>
      <p className="text-sm lg:text-base">{text}</p>
    </div>
  );
};

export default WhyOptions;
