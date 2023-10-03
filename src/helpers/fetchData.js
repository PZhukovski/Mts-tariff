import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import * as fs from 'node:fs';


export async function fetchData() {
  let options = {
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  };

  try {
    console.log("поехали1");
    let browser = await puppeteer.launch(options);
    console.log("поехали2");
    const page = await browser.newPage();
    console.log("поехали3");
    const url =
      "https://moskva.mts.ru/personal/mobilnaya-svyaz/tarifi/vse-tarifi/mobile-tv-inet";
    console.log("поехали4");
    await page.goto(url);
    console.log("поехали5");
    console.log(page.url());
    const data = await page.evaluate(() => {
      return {
        actualTariffs: window.globalSettings.tariffs.actualTariffs,
        catalogMenuItems: window.globalSettings.tariffs.catalogMenuItems,
      };
    });
    console.log(data);

    const jsonData = JSON.stringify(data, null, 2);
    try {
      fs.writeFileSync("data.json", jsonData, "utf8");
      console.log("Данные успешно записаны в файл data.json");
    } catch (error) {
      console.error("Ошибка при записи данных в файл:", error);
    }

    await browser.close();
  } catch (error) {
    console.error("Ошибка при выполнении скрипта:", error);
    throw error;
  }
}
