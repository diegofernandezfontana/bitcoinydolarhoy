import type { TooltipProps } from "recharts";

interface PointPrices {
  price_btc_usd_oficial: number;
  price_btc_usd_blue: number;
  price_usd_blue: number;
  price_usd_oficial: number;
}

interface RowProps {
  name: string;
  price: number;
  display: boolean;
}

const Row = ({ price, display, name }: RowProps) => {
  if (!display) {
    return null;
  }

  return (
    <p className="text-slate-600 text-sm mt-0.5">
      <span className="">{name}: </span>
      {new Intl.NumberFormat("de-DE", {
        maximumFractionDigits: 0,
      }).format(price)}
    </p>
  );
};

const CustomTooltip = (props: TooltipProps<any, any>) => {
  const {
    active,
    payload: payloadProps,
    label,
    displayBtcUsdOficial,
    displayBtcUsdBlue,
  } = props;

  if (!payloadProps) {
    return;
  }

  const element = payloadProps!![0];
  if (!active || !payloadProps || !payloadProps.length) {
    return;
  }

  const { value, payload } = element;
  const {
    price_btc_usd_blue,
    price_usd_oficial,
    price_usd_blue,
    price_btc_usd_oficial,
  } = payload as PointPrices;
  const dateFormatted = label.replace(/-/g, "/");

  return (
    <div className="bg-white p-3 rounded">
      <p className="text-slate-700 font-bold	text-sm">{dateFormatted}</p>

      <Row name="Dolar oficial" display={true} price={price_usd_oficial} />
      <Row name="Dolar blue" display={true} price={price_usd_blue} />
      <Row
        name="Btc (Oficial)"
        display={displayBtcUsdOficial}
        price={price_btc_usd_oficial}
      />
      <Row
        name="Btc (Blue)"
        display={displayBtcUsdBlue}
        price={price_btc_usd_blue}
      />
    </div>
  );
  // }
};

export default CustomTooltip;
