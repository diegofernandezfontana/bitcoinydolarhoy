# 💰 🇦🇷 Bitcoin, Dollar, and Dólar Blue Tracker

This repository contains three mini-projects aimed at reflecting and comparing the price of Bitcoin, the official Dollar, and the Dólar Blue in relation to the Argentine Peso. You can visualize the evolution of these values through a graph.

- 🕸 Web Scraper
- 💻 Next.js Project
- 📅 Historical Data Integration

### 🕸 Web Scraper

A small scraper designed to fetch data daily from relevant websites that provide information about Bitcoin, the official Dollar, and Dollar Blue in Argentina. This scrapper will run every hour and will save in a static file, the price of the btc, the dollar and the dollar blue.

### 💻 Next.js

Simple next js proyect, that will display a chart + page where the prices can be compared.
This App, gets the latest price of the dolar blue, official dolar and bitocin from a static file.

### 📅 Historial Data Integration.

Project that will get and transform the historic data and it will convert it to a static file.

#### To do:

- [x] Improve readme
- [x] Find the historic data of the btc (till 28-04-2013)
- [x] Find the historic data of the official and dollar blue.
- [x] Save and transform data.
- [x] Add readme for historial data integration. How to run, info. etc
- [x] Add Page with graph + historical comparission.
- [x] Deploy to prod (Vercel)
- [x] Add Scrapper to get the latest price.
- [x] Add Page with current prices of btc/dollar.
- [ ] Add readme Astro proyect
- [x] Find remaining btc prices
- [ ] Automate deployment every 10 min
- [ ] Extend readme how to run cron job.

This project will start 05/09.

The project is run by the bash script `run-all.sh`.
This executes all secuntialy, first getting historical data, then running cron to get current price, then pushing bitcoindolarhoy to vercel and finally pushing tweet with current price.
