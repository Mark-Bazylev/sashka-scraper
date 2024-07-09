import { describe, expect, test } from "bun:test";
import {
  countScrapingStatus,
  getExtractionModel,
  performScraping,
  scrapeProductsDetails,
  scrapeUrl,
  ScrapingStatus,
} from "../services/scraping.service";

const urlList = [
  "https://www.amazon.com/Samsung-Galaxy-Watch-Active2-Stainless/dp/B07VGQ78TR/",
  "https://www.ebay.com/itm/154758671631?epid=19036945722&hash=item2408df52df:g:9qYAAOSwB79g5M7P",
  "https://www.amazon.com/Anker-PowerCore-Portable-Charger-Compact/dp/B01N9RS20C/",
  "https://www.ebay.com/itm/184605728307?epid=21034721412&hash=item2afdbdbe33:g:kpoAAOSwOwtf8xMn",
];

describe("Scraping", () => {
  test("scrapeProductsDetails", async () => {
    const result = await scrapeProductsDetails(urlList);
    expect(result).toEqual({ successLength: 1, failedLength: 3 });
  });

  describe("countScrapingStatus", () => {
    test("countScrapingStatus", () => {
      const scrapingStatusArr = [
        ScrapingStatus.failed,
        ScrapingStatus.success,
        ScrapingStatus.success,
      ];
      const result = countScrapingStatus(scrapingStatusArr);
      expect(result).toEqual({ successLength: 2, failedLength: 1 });
    });
    test("emptyArray", () => {
      const result = countScrapingStatus([]);
      expect(result).toEqual({ successLength: 0, failedLength: 0 });
    });
  });

  describe("performScraping", () => {
    test("success", async () => {
      const extractionModel = getExtractionModel(urlList[3]);
      const result = await performScraping(urlList[3], extractionModel);
      expect(result).toBe(ScrapingStatus.success);
    });
    test("failed", async () => {
      const extractionModel = getExtractionModel(urlList[0]);
      const result = await performScraping(urlList[0], extractionModel);
      expect(result).toBe(ScrapingStatus.failed);
    });
  });

  describe("scrapeUrl", () => {
    test("success", async () => {
      const result = await scrapeUrl(urlList[3]);
      expect(result).toBe(ScrapingStatus.success);
    });
    test("failed", async () => {
      const result = await scrapeUrl(urlList[0]);
      expect(result).toBe(ScrapingStatus.failed);
    });
  });
});
