## This historical gets data from 2 sources

- Coingecko api: https://api.coingecko.com/api/v3/coins/bitcoin/market_chart
- Dolar history JSON FILE: https://api.bluelytics.com.ar/v2/evolution.json

In order to get the info from each script, we need node installed. Also its needed a package manager like npm,yarn or pnpm.

- Get btc info from coingecko

`yarn get:btc`

- Get usd json bluelytics

`yarn get:usd`

- Generate data set with all values, blue dolar (unoficial), dolar oficial and BTC.

`yarn get:aggregate`

---

Better data can be required later on, since there are a lot of days where the price of the USD is not as precise and some days are also missing.
