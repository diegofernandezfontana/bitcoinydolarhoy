import {
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type Ref,
  type RefObject,
} from "react";
import dataJson from "../../data.json";
import ArrowDownIcon from "../icons/ArrowDownIcon.astro";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = Object.keys(dataJson).map((el) => {
  return {
    date: el,
    price_btc: dataJson[el].price_btc * dataJson[el].price_usd_blue,
    price_usd_blue: dataJson[el].price_usd_blue,
    price_usd_oficial: dataJson[el].price_usd_oficial,
  };
});

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
          fill="#666"
          transform="rotate(-35)"
        >
          {payload.value}
        </text>
      </g>
    </>
  );
};

export const Graph = () => {
  const [width, setWidth] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }
    const { width } = ref.current.getBoundingClientRect();
    setWidth(width);
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      const graphDivContainer = ref.current as HTMLDivElement;
      const { width } = graphDivContainer.getBoundingClientRect();
      setWidth(width);
    });

    return () => window.removeEventListener("resize", () => {});
  }, []);

  if (!isOpen) {
    return <button onClick={() => setIsOpen(true)}> Expand</button>;
  }

  return (
    <div ref={ref}>
      <button onClick={() => setIsOpen(false)}> Close</button>

      <AreaChart
        width={width}
        height={500}
        data={data}
        margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
      >
        <XAxis
          dataKey="date"
          width={40}
          height={80}
          tick={<CustomizedAxisTick />}
        />
        <Tooltip content={<div />} />
        <YAxis tick={<div />} width={2} />

        <defs>
          <linearGradient id="price_btc" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#43bfb9" stopOpacity={0.5} />
            <stop offset="50%" stopColor="#43bfb9" stopOpacity={0.5} />
            <stop offset="95%" stopColor="#43bfb9" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="10  5"
          opacity={0.4}
          verticalPoints={[]}
        />
        <Area
          strokeWidth={2}
          type="monotone"
          dataKey="price_btc"
          stroke="#43bfb9"
          fillOpacity={1}
          fill="url(#price_btc)"
        />
        <Area
          strokeWidth={2}
          type="monotone"
          dataKey="price_usd_blue"
          stroke="#43bfb9"
          fillOpacity={1}
          fill="url(#price_usd_blue)"
        />
        <Area
          strokeWidth={2}
          type="monotone"
          dataKey="price_usd_blue"
          stroke="#43bfb9"
          fillOpacity={1}
          fill="url(#price_usd_blue)"
        />
      </AreaChart>
    </div>
  );
};
