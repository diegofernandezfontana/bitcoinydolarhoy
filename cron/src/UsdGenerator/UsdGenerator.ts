import { JSDOM } from "jsdom";
import { getAndSaveUsdHTML, readFileAndGetDom } from "./getDolarPrice";

export class UsdGenerator {
  private priceUsdBlueBuy: string;
  private priceUsdBlueSell: string;
  private priceUsdOficialBuy: string;
  private priceUsdOficialSell: string;

  public static OUTPUT_DIR = "./src/UsdGenerator/";
  public static HTML_FILE = "file.html";
  constructor() {
    this.priceUsdBlueBuy = "";
    this.priceUsdBlueSell = "";
    this.priceUsdOficialBuy = "";
    this.priceUsdOficialSell = "";
  }

  start = async (): Promise<void> => {
    await getAndSaveUsdHTML(UsdGenerator.OUTPUT_DIR, UsdGenerator.HTML_FILE);

    const dom = await readFileAndGetDom(UsdGenerator.HTML_FILE);

    this.setBlueUsdPrice(dom);
    this.setOficialUsdPrice(dom);
  };

  setBlueUsdPrice = (dom: JSDOM) => {
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

    this.priceUsdBlueBuy = compraValue.replace("$", "");
    this.priceUsdBlueSell = ventaValue.replace("$", "");
  };

  setOficialUsdPrice = (dom: JSDOM) => {
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

    this.priceUsdOficialBuy = compraValue.replace("$", "");
    this.priceUsdOficialSell = ventaValue.replace("$", "");
  };

  getOutputData = (date: string) => {
    return {
      precio_usd_blue_compra: this.priceUsdBlueBuy,
      precio_usd_blue_venta: this.priceUsdBlueSell,
      precio_usd_oficial_compra: this.priceUsdOficialBuy,
      precio_usd_oficial_venta: this.priceUsdOficialSell,
      date,
    };
  };
}
