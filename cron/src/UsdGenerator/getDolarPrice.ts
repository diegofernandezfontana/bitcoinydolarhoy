import { JSDOM } from "jsdom";

export const getAndSaveUsdHTML = async (
  OUTPUT_DIR: string,
  HTMLFILE: string
) => {
  const response = await fetch("https://dolarhoy.com/");
  const dolarHoyHtml = await response.text();

  await Bun.write(OUTPUT_DIR + "usd" + HTMLFILE, dolarHoyHtml);
};

export const readFileAndGetDom = async (
  OUTPUT_DIR: string,
  HTMLFILE: string
): Promise<JSDOM> => {
  const file = await Bun.file(OUTPUT_DIR + HTMLFILE);
  const text = await file.text();

  return new JSDOM(text);
};
