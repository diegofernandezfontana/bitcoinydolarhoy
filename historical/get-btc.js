import { writeFile } from "fs/promises";
const MAX_HISTORIC_DAYS = 900000;

const PARAMS = {
  vsCurrecny: "usd",
  days: MAX_HISTORIC_DAYS,
  interval: "daily",
};

// This api fetches btc price till 28-04-2013
const COINGECKO_API = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${PARAMS.vsCurrecny}&days=${PARAMS.days}&interval=${PARAMS.interval}`;

fetch(COINGECKO_API)
  .then((res) => {
    return res.json();
  })
  .then(({ prices }) => {
    if (!prices) {
      throw new Error("Coingecko api is not returning prices any longer");
    }

    const formattedResult = getFormattedData(prices);

    writeFile("btc_data.json", JSON.stringify(formattedResult, null, 2));
  })
  .catch((e) => {
    console.error("Something went wrong trying to fetch data. Error:", e);
  });

function getDateDDMMYYY(timestamp) {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

function getFormattedData(prices) {
  const formattedData = {};

  for (const [timestamp, price] of prices) {
    const date = getDateDDMMYYY(timestamp);
    formattedData[date] = {
      price_btc: price,
    };
  }

  return formattedData;
}
