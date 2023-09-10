import type { TooltipProps } from "recharts";

const CustomTooltip = (props: TooltipProps<any, any>) => {
  const { active, payload: payloadProps, label } = props;
  if (!payloadProps) {
    return;
  }
  const element = payloadProps!![0];
  console.log(active, payloadProps);
  if (!active || !payloadProps || !payloadProps.length) {
    return;
  }

  const { value, payload } = element;
  return (
    <div className="bg-white p-2 rounded border border-red-500">
      <p className="text-slate-700 mb-1 font-bold	"> {`${label}`}</p>

      <div className="flex mt-2">
        <p className="text-slate-800">
          {new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
            maximumFractionDigits: 0,
          }).format(element.value)}
        </p>
        <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium mr-2 px-1.5 py-1 rounded dark:bg-green-900 dark:text-green-300">
          +{" "}
          {/*new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
            maximumFractionDigits: 0,
          }).format(diff || 0)
        
        */}
        </span>
      </div>
      <p className="text-slate-500">
        {/*new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
          maximumFractionDigits: 0,
        }).format(withouthInterest || 0) */}
      </p>
    </div>
  );
  // }
};

export default CustomTooltip;
