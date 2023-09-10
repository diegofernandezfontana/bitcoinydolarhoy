import type { YAxisProps } from "recharts";

const CustomYAxsis = (props: YAxisProps) => {
  const { payload, x, y, index } = props;

  const zeroValueYAxis = 0;

  if (index === zeroValueYAxis) {
    return null;
  }

  return (
    <>
      <g transform={`translate(${x + 10},${y})`}>
        <text x={0} y={0} dy={0} opacity={0.7} textAnchor="start" fill="#fff">
          {new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(payload.value)}
        </text>
      </g>
    </>
  );
};

export default CustomYAxsis;
