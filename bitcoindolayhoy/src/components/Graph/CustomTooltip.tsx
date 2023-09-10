import type { TooltipProps } from "recharts";

interface PointPrices {
  price_btc_usd_oficial: number;
  price_btc_usd_blue: number;
  price_usd_blue: number;
  price_usd_oficial: number;
}

interface RowProps {
  id: string;
  name: string;
  price: number;
  display: boolean;
  color: string;
}

const Row = ({ id, price, display, name, color }: RowProps) => {
  if (!display) {
    return null;
  }

  return (
    <div className="flex items-center ">
      {/* could be usefull to rewrite */}
      {id === "price_usd_oficial" ? (
        <div className={`w-2 h-2 mr-1 bg-[#16a34a] rounded `}></div>
      ) : null}
      {id === "price_usd_blue" ? (
        <div className={`w-2 h-2 mr-1 bg-[#0e7490] rounded `}></div>
      ) : null}
      {id === "price_btc_usd_oficial" ? (
        <div className={`w-2 h-2 mr-1 bg-[#f59e0b] rounded `}></div>
      ) : null}

      {id === "price_btc_usd_blue" ? (
        <div className={`w-2 h-2 mr-1 bg-[#d97706] rounded `}></div>
      ) : null}

      <p className="text-slate-600 text-sm mt-0.5">
        <span className="">{name}: </span>$
        {new Intl.NumberFormat("de-DE", {
          maximumFractionDigits: 0,
        }).format(price)}
      </p>
    </div>
  );
};
interface Element {
  id: string;
  name: string;
  color: string;
  display: boolean;
}

interface MoreProps {
  elements: Element[];
}
type TooltipExtendedProps = TooltipProps<any, any> & MoreProps;

const CustomTooltip = (props: TooltipExtendedProps) => {
  const { active, payload: payloadProps, label, elements } = props;

  if (!payloadProps) {
    return;
  }

  const element = payloadProps!![0];
  if (!active || !payloadProps || !payloadProps.length) {
    return;
  }

  const { payload } = element;
  const dateFormatted = label.replace(/-/g, "/");

  return (
    <div className="bg-white p-3 rounded">
      <p className="text-slate-700 font-bold	text-sm">{dateFormatted}</p>
      {elements.map((el) => {
        return (
          <Row
            id={el.id}
            name={el.name}
            price={payload[el.id]}
            display={el.display}
            color={el.color}
          />
        );
      })}
    </div>
  );
};

export default CustomTooltip;
