import { readFile, writeFile } from "fs/promises";

const BTC_DATA = "btc_data.json";
const USD_DATA = "usd_data.json";

const btcPrices = await getFileData(BTC_DATA);
const usdPrices = await getFileData(USD_DATA);

const result = getEntriesData([btcPrices, usdPrices]);
const data = getAggregateData(result);

writeFile("data/days-with-data.json", JSON.stringify(data, null, 2));

// Helper functions

function getAggregateData(entriesData) {
  const data = {};
  Object.entries(entriesData)
    .filter(([_, el]) => {
      return el.price_usd_blue && el.price_btc && el.price_usd_oficial;
    })
    .forEach((item) => {
      const [date, prices] = item;
      data[date] = { ...prices };
    });
  return data;
}

async function getFileData(fileName) {
  return readFile(`./data/${fileName}`, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    return data;
  })
    .then((el) => {
      return JSON.parse(el);
    })
    .catch((e) => {
      console.log("Something went wrong getting file data: ", fileName);
      console.error(e);
    });
}

function getEntriesData(dataSets = []) {
  const data = {};
  dataSets.forEach((el) => {
    for (const [date, value] of Object.entries(el)) {
      const { price_btc, price_usd_blue, price_usd_oficial } = value;

      if (!data[date]) {
        data[date] = {};
      }
      if (!price_btc && !price_usd_blue && !price_usd_oficial) {
        console.log("No values for: ", date, "in: ", el);
      }

      if (price_btc) {
        data[date] = {
          ...data[date],
          price_btc,
        };
      }

      if (price_usd_blue) {
        data[date] = {
          ...data[date],
          price_usd_blue,
        };
      }

      if (price_usd_oficial) {
        data[date] = {
          ...data[date],
          price_usd_oficial,
        };
      }
    }
  });

  return data;
}
