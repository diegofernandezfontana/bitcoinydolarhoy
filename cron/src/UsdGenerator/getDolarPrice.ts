import { JSDOM } from "jsdom";

import { resolve } from "path";

export const getAndSaveUsdHTML = async (
  OUTPUT_DIR: string,
  HTMLFILE: string
) => {
  const response = await fetch("https://dolarhoy.com");

  const dolarHoyHtml = await response.text();
  await Bun.write(import.meta.dir + "/" + HTMLFILE, dolarHoyHtml);
};

export const readFileAndGetDom = async (HTMLFILE: string): Promise<JSDOM> => {
  const fileLocation = HTMLFILE;
  const file = await Bun.file(import.meta.dir + "/" + fileLocation);
  const text = await file.text();

  return new JSDOM(text);
};
