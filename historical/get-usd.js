import { writeFile } from "fs/promises";

const USD_PUBLIC_API = "https://api.bluelytics.com.ar/v2/evolution.json";

const API = {
  SOURCE_USD_BLUE: "Blue",
  SOURCE_USD_OFICIAL: "Oficial",
};

fetch(USD_PUBLIC_API)
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    if (!res) {
      throw new Error("Api not responding...");
    }
    const data = getFormattedData(res);

    writeFile("data/usd_data.json", JSON.stringify(data, null, 2));
  })
  .catch((e) => {
    console.error("Something went wrong trying to fetch data. Error:", e);
  });

function convertDateToDDMMYYYY(apiResponseDate = "") {
  const [year, month, day] = apiResponseDate.split("-");
  return `${day}-${month}-${year}`;
}

function getFormattedData(apiResponse) {
  const formattedData = {};

  apiResponse.forEach((item) => {
    const { date, source, value_sell, value_buy } = item;
    const formattedDate = convertDateToDDMMYYYY(date);
    if (!formattedData[formattedDate]) {
      formattedData[formattedDate] = {};
    }

    if (source === API.SOURCE_USD_BLUE) {
      formattedData[formattedDate] = {
        ...formattedData[formattedDate],
        price_usd_blue: value_buy,
      };
    }

    if (source === API.SOURCE_USD_OFICIAL) {
      formattedData[formattedDate] = {
        ...formattedData[formattedDate],
        price_usd_oficial: value_buy,
      };
    }
  });

  return formattedData;
}
