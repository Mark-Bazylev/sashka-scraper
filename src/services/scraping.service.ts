import axios from "axios";
import * as cheerio from "cheerio";
import { extractionModels } from "../extraction-models";
import { mockDb } from "../db/productsDetailsDb";
import Bottleneck from "bottleneck";

const limiter = new Bottleneck({
  maxConcurrent: Number(process.env.CONCURRENCY_LIMIT),
});

const getExtractionModel = (url: string) => {
  const parsedUrl = new URL(url);
  const domain = parsedUrl.hostname.split(".")[1];
  return extractionModels[domain];
};

const scrapeUrl = async (url: string) => {
  await limiter.schedule(async () => {
    const extractionModel = getExtractionModel(url);
    if (!extractionModel) {
      return;
    }
    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      const productDetails = extractionModel.extractProductDetails($);
      mockDb.set(productDetails.title, { ...productDetails, url });
    } catch (e) {
      console.log(e);
    }
  });
};

export const scrapeProductsDetails = async (urls: string[]) => {
  const promises = urls.map((url) => scrapeUrl(url));
  await Promise.all(promises);
  return "success";
};
