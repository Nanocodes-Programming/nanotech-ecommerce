function BackArrowIcon({ color, height, width }) {
  return (
    <svg
      width={width ? width : '22'}
      height={height ? height : '29'}
      viewBox="0 0 23 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.0605 3.04102L3.1003 14.0168L19.2468 26.1382"
        stroke={color ? color : 'white'}
        stroke-width="4.2768"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default BackArrowIcon;
