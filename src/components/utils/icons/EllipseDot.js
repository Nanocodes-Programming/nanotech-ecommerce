function EllipseDot({ color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 36 36"
      fill="none"
    >
      <circle
        cx="18.1713"
        cy="17.8007"
        r="17.2856"
        fill={color ? color : '#289402'}
      />
    </svg>
  );
}

export default EllipseDot;
// fill: #FFB800;
