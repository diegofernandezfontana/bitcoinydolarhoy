import { getAndSaveUsdHTML } from "../UsdGenerator/getDolarPrice";

type BtcCurrency = {
  usd: number;
};
type CoingGeckoRespoinse = {
  bitcoin: BtcCurrency;
};

export class BtcGeneratr {
  public static OUTPUT_DIR = "./src";
  public static HTML_FILE = "file.html";
  public btcPrice: any;

  constructor() {
    this.btcPrice = 0;
  }

  start = async () => {
    await this.setBtcPrice();
  };

  setBtcPrice = async (): Promise<void> => {
    const BTC_PARAM = "ids=bitcoin";
    const USD_PARAM = "vs_currencies=usd";
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?${BTC_PARAM}&${USD_PARAM}`
    )
      .then((el) => {
        return el.json() as any as CoingGeckoRespoinse;
      })
      .catch((err) => console.log(err));

    this.btcPrice = response?.bitcoin.usd;
  };

  getOutputData = () => {
    return {
      btc_price_usd: this.btcPrice,
    };
  };
}

const btcGenerator = new BtcGeneratr();

await btcGenerator.setBtcPrice();
