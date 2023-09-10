const CustomizedAxisTick = (props) => {
  const { x, y, payload } = props;
  return (
    <>
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#fff"
          transform="rotate(-25)"
        >
          {payload.value}
        </text>
      </g>
    </>
  );
};

export default CustomizedAxisTick;
