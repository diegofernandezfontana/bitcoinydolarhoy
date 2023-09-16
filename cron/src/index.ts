import Cron from "cron";

import { getDateDDMMYYYY_HHMM } from "./utils";
import { UsdGenerator } from "./UsdGenerator/UsdGenerator";
import { BtcGeneratr } from "./BtcGenerator/BtcGenerator";

const handlerFunction = async () => {
  const date = getDateDDMMYYYY_HHMM();
  console.log("Starting script at: ", date.toString());

  // USD GET, SET PRICE
  const usdGenerator = new UsdGenerator();
  await usdGenerator.start();
  const usdResult = await usdGenerator.getOutputData(date);

  // BTC GET, SET PRICE
  const btcGenerator = new BtcGeneratr();
  await btcGenerator.start();
  const btcUsdResult = btcGenerator.getOutputData();
  const final = { ...usdResult, ...btcUsdResult };

  console.log("FINAL:", final);
  await Bun.write(
    import.meta.dir + "/" + "output/last_update.json",
    JSON.stringify(final)
  );

  const bitcoinDolarHoyPath = "../bitcoindolayhoy/src/last_update.json";
  await Bun.write(bitcoinDolarHoyPath, JSON.stringify(final));

  console.log(
    "file saved! in last_update.json and in /bitcoindolarhoy/src/last_update.json"
  );
};

const startNow = true;

const CRON_EXECUTION_TIME = "* * * * * *";
const job = new Cron.CronJob(
  CRON_EXECUTION_TIME,
  handlerFunction,
  null,
  startNow,
  "America/Los_Angeles"
);
