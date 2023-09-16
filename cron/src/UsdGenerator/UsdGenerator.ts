import { JSDOM } from "jsdom";

export class UsdGenerator {
  public priceUsdBlueBuy: string;
  priceUsdBlueSell: string;
  priceUsdOficialBuy: string;
  priceUsdOficialSell: string;

  constructor() {
    this.priceUsdBlueBuy = "";
    this.priceUsdBlueSell = "";
    this.priceUsdOficialBuy = "";
    this.priceUsdOficialSell = "";
  }

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
