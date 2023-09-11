import Cron from "cron";
import { JSDOM } from "jsdom";

const CRON_EXECUTION_TIME = "* * * * * *";

const HTMLFILE = "file.html";

const OUTPUT_DIR = "./src/";

const getOficialUsdPrice = (dom: JSDOM) => {
  const parentElement = dom.window.document.querySelectorAll(
    "[href='/cotizaciondolaroficial']"
  )[0].parentNode;

  if (!parentElement) {
    throw new Error("Dolar oficial price not found");
  }

  const compraValue =
    parentElement.querySelector(".compra .val")?.textContent || "";
  const ventaValue =
    parentElement.querySelector(".venta .val")?.textContent || "";

  return [compraValue.replace("$", ""), ventaValue.replace("$", "")];
};

const getBlueUsdPrice = (dom: JSDOM) => {
  const parentElement = dom.window.document.querySelectorAll(
    "[href='/cotizaciondolarblue']"
  )[0].parentNode;

  if (!parentElement) {
    throw new Error("Dolar blue price not found");
  }

  const compraValue =
    parentElement.querySelector(".compra .val")?.textContent || "";
  const ventaValue =
    parentElement.querySelector(".venta .val")?.textContent || "";

  return [compraValue.replace("$", ""), ventaValue.replace("$", "")];
};

const getAndSaveHTML = async () => {
  const response = await fetch("https://dolarhoy.com/");
  const dolarHoyHtml = await response.text();

  await Bun.write(OUTPUT_DIR + HTMLFILE, dolarHoyHtml);
};

const readFileAndGetDom = async (): Promise<JSDOM> => {
  const file = await Bun.file(OUTPUT_DIR + HTMLFILE);
  const text = await file.text();

  return new JSDOM(text);
};

const handlerFunction = async () => {
  const date = obtenerFechaFormato();
  console.log("Starting script at: ", date.toString());

  await getAndSaveHTML();
  const dom = await readFileAndGetDom();

  const [priceUsdBlueBuy, priceUsdBlueSell] = getBlueUsdPrice(dom);
  const [priceUsdOficialBuy, priceUsdOficialSell] = getOficialUsdPrice(dom);

  const data = {
    precio_usd_blue_compra: priceUsdBlueBuy,
    precio_usd_blue_venta: priceUsdBlueSell,
    precio_usd_oficial_compra: priceUsdOficialBuy,
    precio_usd_oficial_venta: priceUsdOficialSell,
    date,
  };

  await Bun.write("./src/last_update.json", JSON.stringify(data));
  await Bun.write(
    "../bitcoindolayhoy/src/last_update.json",
    JSON.stringify(data)
  );

  console.log(
    "file saved! in last_update.json and in /bitcoindolarhoy/src/last_update.json"
  );
};

const obtenerFechaFormato = () => {
  const fecha = new Date();

  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Los meses en JS comienzan en 0 para enero, 1 para febrero, etc.
  const ano = fecha.getFullYear();

  const horas = String(fecha.getHours()).padStart(2, "0");
  const minutos = String(fecha.getMinutes()).padStart(2, "0");

  return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
};

const startNow = true;

const job = new Cron.CronJob(
  CRON_EXECUTION_TIME,
  handlerFunction,
  null,
  startNow,
  "America/Los_Angeles"
);
