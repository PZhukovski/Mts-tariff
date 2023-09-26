import express from "express";
import puppeteer from "puppeteer-core";
import { writeFileSync } from "fs";
import chromium from "@sparticuz/chromium";

const app = express();

const port = process.env.PORT || 3001;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/Mts-tariff/api", async (req, res) => {
  console.log("поехали");

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
    const url = "https://moskva.mts.ru/personal/mobilnaya-svyaz/tarifi/vse-tarifi/mobile-tv-inet"
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
      writeFileSync("data.json", jsonData, "utf8");
      console.log("Данные успешно записаны в файл data.json");
    } catch (error) {
      console.error("Ошибка при записи данных в файл:", error);
    }

    await browser.close();
  } catch (error) {
    console.error("Ошибка при выполнении скрипта:", error);
    res.status(500).json({ error: "Ошибка при чтении данных" });
  }
});

export default app;
