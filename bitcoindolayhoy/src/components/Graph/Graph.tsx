import { useEffect, useLayoutEffect, useRef, useState } from "react";
import dataJson from "../../data.json";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomizedAxisTick from "./CustomXAxis";
import CustomTooltip from "./CustomTooltip";
import CustomYAxsis from "./CustomYAxsis";

interface Prices {
  price_btc: number;
  price_usd_blue: number;
  price_usd_oficial: number;
}

const data = Object.keys(dataJson).map((el: keyof any) => {
  const current = dataJson[el] as Prices;

  return {
    date: el,
    price_btc_usd_oficial: current.price_btc * current.price_usd_oficial,
    price_btc_usd_blue: current.price_btc * current.price_usd_blue,
    price_usd_blue: current.price_usd_blue,
    price_usd_oficial: current.price_usd_oficial,
  };
});

export const Graph = () => {
  const [width, setWidth] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [displayBtc, setDisplayBtc] = useState<boolean>(false);
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

  //https://tailwindcss.com/docs/customizing-colors
  const usdBlueColor = "#0e7490";
  const usdOfficialColor = "#16a34a";
  const btcUsdOficial = "#f59e0b";
  const btcUsdBlue = "#d97706";

  const elements = [
    { id: "price_usd_oficial", color: usdOfficialColor, display: true },
    { id: "price_usd_blue", color: usdBlueColor, display: true },
    { id: "price_btc_usd_oficial", color: btcUsdOficial, display: displayBtc },
    { id: "price_btc_usd_blue", color: btcUsdBlue, display: displayBtc },
  ];

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
        <Tooltip
          content={
            <CustomTooltip
              displayBtcUsdOficial={displayBtc}
              displayBtcUsdBlue={displayBtc}
            />
          }
        />
        <YAxis tick={<CustomYAxsis />} width={2} />

        {elements.map((el) => {
          return (
            <>
              {el.display ? (
                <>
                  <defs>
                    <linearGradient id={el.id} x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={el.color}
                        stopOpacity={0.5}
                      />
                      <stop
                        offset="50%"
                        stopColor={el.color}
                        stopOpacity={0.5}
                      />
                      <stop
                        offset="95%"
                        stopColor={el.color}
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    strokeWidth={2}
                    type="monotone"
                    dataKey={el.id}
                    stroke={el.color}
                    fillOpacity={1}
                    fill={`url(#${el.id})`}
                  />
                </>
              ) : null}
            </>
          );
        })}
        <CartesianGrid
          vertical={false}
          strokeDasharray="10 3"
          opacity={0.1}
          stroke="#fff"
        />
      </AreaChart>
      <div className={"flex border-2 border-red-50 align-middle"}>
        <p>display btc:</p>
        <button onClick={() => setDisplayBtc(!displayBtc)}>
          {displayBtc ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-square-check"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#2c3e50"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
              <path d="M9 12l2 2l4 -4" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-square"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#2c3e50"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};
