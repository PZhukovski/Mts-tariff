// server.js
import express from "express";
import puppeteer from "puppeteer-core";
import { writeFileSync } from "fs";

const app = express();
const port = process.env.PORT || 3001;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/api/data", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      executablePath:
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      headless: "new",
    });
    const page = await browser.newPage();

    const url =
      "https://moskva.mts.ru/personal/mobilnaya-svyaz/tarifi/vse-tarifi/mobile-tv-inet";
    await page.goto(url);

    const data = await page.evaluate(() => {
      return {
        actualTariffs: window.globalSettings.tariffs.actualTariffs,
        catalogMenuItems: window.globalSettings.tariffs.catalogMenuItems,
      };
    });
    const jsonData = JSON.stringify(data, null, 2);
    try {
      writeFileSync("data.json", jsonData, "utf8");
      console.log("Данные успешно записаны в файл data.json");
    } catch (error) {
      console.error("Ошибка при записи данных в файл:", error);
    }

    await browser.close();
  } catch (error) {
    res.status(500).json({ error: "Ошибка при чтении данных" });
  }
});

export default app;

