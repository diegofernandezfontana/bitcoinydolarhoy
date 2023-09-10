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
import CloseButton from "./CloseButton";
import ShowBtcButton from "./ShowBtcButton";

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
      console.log("ENtro al reerender");
      setWidth(width);
    });

    return () => window.removeEventListener("resize", () => {});
  }, []);

  if (!isOpen) {
    return (
      <div className="w-full text-center flex justify-center cursor-pointer ">
        <div className=" transition-all group/item duration-500">
          <button
            className="flex justify-center bg-blue-900 duration-200 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsOpen(true)}
          >
            Mostrar grafico
          </button>
        </div>
      </div>
    );
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
    <div ref={ref} className="relative ">
      <CloseButton setIsOpen={setIsOpen} />
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
      <ShowBtcButton onClick={setDisplayBtc} isDisplayed={displayBtc} />
    </div>
  );
};
