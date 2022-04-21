interface Props {
  color?: string;
}

function TickMark({ color }: Props) {
  return (
    <svg
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.00016 11.17L1.83016 6.99997L0.410156 8.40997L6.00016 14L18.0002 1.99997L16.5902 0.589966L6.00016 11.17Z"
        fill={color ? color : "#1D99F2"}
      />
    </svg>
  );
}

export default TickMark;
