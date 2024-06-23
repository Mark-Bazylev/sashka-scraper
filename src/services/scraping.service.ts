import axios from "axios";
import * as cheerio from "cheerio";
import { extractionModels } from "../extraction-models";
import { mockDb } from "../db/productsDetailsDb";
import Bottleneck from "bottleneck";

class ScrapingService {
  public limiter = new Bottleneck({
    maxConcurrent: Number(process.env.CONCURRENCY_LIMIT),
  });

  public async scrapeProductsDetails(urls: string[]) {
    const promises = urls.map((url) => this.scrapeUrl(url));
    await Promise.all(promises);
    return "success";
  }

  public async scrapeUrl(url: string) {
    await this.limiter.schedule(async () => {
      const extractionModel = this.getExtractionModel(url);
      if (!extractionModel) {
        return;
      }
      try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const productDetails = extractionModel.extractProductDetails($);
        mockDb.set(productDetails.title, { ...productDetails, url });
      } catch (e) {
        //add error handling in the future
        // console.log(e);
      }
    });
  }
  public getExtractionModel(url: string) {
    const parsedUrl = new URL(url);
    const domain = parsedUrl.hostname.split(".")[1];
    return extractionModels[domain];
  }
}

export const scraper = new ScrapingService();
