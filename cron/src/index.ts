console.log("Hello via Bun!");

import Cron from "cron";

const CRON_EXECUTION_TIME = "0 */1 * * * *";
const outputPath = "./src/file.html";

const handlerFunction = async () => {
  const date = obtenerFechaFormato();

  console.log("Handler func executed at:", String(date));
  const response = await fetch("https://dolarhoy.com/");
  const dolarHoyHtml = await response.text(); // HTML string

  await Bun.write(outputPath, dolarHoyHtml);

  const file = await Bun.file(outputPath);
  const text = await file.text();

  const compraRegex = /<div class="compra">.*?<div class="val">\$(\d+)<\/div>/s;
  const ventaRegex = /<div class="venta">.*?<div class="val">\$(\d+)<\/div>/s;

  //retorna un [<div...> , "PRICE_USD"]
  const valorCompra = text.match(compraRegex);
  const valorVenta = text.match(ventaRegex);

  const precioCompra = valorCompra[1];
  if (!precioCompra) {
    throw new Error("No se encontro el precio de compra");
  }

  const precioVenta = valorVenta[1];
  if (!precioVenta) {
    throw new Error("No se encontro el precio de venta");
  }

  const data = {
    precio_usd_compra: precioCompra,
    precio_usd_venta: precioVenta,
    date,
  };

  await Bun.write("./src/last_update.json", JSON.stringify(data));
  await Bun.write(
    "../bitcoindolayhoy/src/last_update.json",
    JSON.stringify(data)
  );
  console.log("file saved!");
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

new Cron.CronJob(
  CRON_EXECUTION_TIME,
  () => handlerFunction,
  null,
  startNow,
  "America/Los_Angeles"
);
