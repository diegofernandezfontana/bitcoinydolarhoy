import Cron from "cron";

import {
  getAndSaveUsdHTML,
  readFileAndGetDom,
} from "./UsdGenerator/getDolarPrice";
import { getDateDDMMYYYY_HHMM } from "./utils";
import { UsdGenerator } from "./UsdGenerator/UsdGenerator";

const HTMLFILE = "file.html";
const OUTPUT_DIR = "./src/";

const handlerFunction = async () => {
  const date = getDateDDMMYYYY_HHMM();
  console.log("Starting script at: ", date.toString());
  const outputUsdBuilder = new UsdGenerator();

  await getAndSaveUsdHTML(OUTPUT_DIR, HTMLFILE);
  const dom = await readFileAndGetDom(OUTPUT_DIR, HTMLFILE);

  outputUsdBuilder.setBlueUsdPrice(dom);
  outputUsdBuilder.setOficialUsdPrice(dom);

  const data = outputUsdBuilder.getOutputData(date);

  await Bun.write("./src/output/last_update.json", JSON.stringify(data));
  await Bun.write(
    "../bitcoindolayhoy/src/last_update.json",
    JSON.stringify(data)
  );

  console.log(
    "file saved! in last_update.json and in /bitcoindolarhoy/src/last_update.json"
  );
};

const startNow = true;

const CRON_EXECUTION_TIME = "0-59 * * * *";
const job = new Cron.CronJob(
  CRON_EXECUTION_TIME,
  handlerFunction,
  null,
  startNow,
  "America/Los_Angeles"
);
