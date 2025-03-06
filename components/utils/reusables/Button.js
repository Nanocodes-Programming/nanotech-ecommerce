const Button = ({ children, eventHandler, type, loading }) => {
  const styles = {
    main: `flex items-center justify-center w-full border-none outline-none font-semibold text-lg text-white rounded-md bg-[#339944] p-3`,
  };

  return (
    <button
      onClick={eventHandler}
      type={type}
      disabled={loading}
      className={styles?.main}
    >
      {children}
    </button>
  );
};

export default Button;
