import axios from "axios";
import * as cheerio from "cheerio";
import { extractionModels } from "../extraction-models";
import { mockDb } from "../db/productsDetailsDb";
import Bottleneck from "bottleneck";
import { ExtractionModelBase } from "../extraction-models/extraction-model-base";
import {ProductDetails} from "../models/product-details";
export interface ScrapingStatusCount {
  successLength: number;
  failedLength: number;
}
export enum ScrapingStatus {
  success = "success",
  failed = "failed",
}

const limiter = new Bottleneck({
  maxConcurrent: Number(process.env.CONCURRENCY_LIMIT),
});

export async function scrapeUrl(url: string) {
  return await limiter.schedule(async () => {
    const extractionModel = getExtractionModel(url);
    if (!extractionModel) {
      return ScrapingStatus.failed;
    }
    return await performScraping(url, extractionModel);
  });
}

export function getExtractionModel(url: string) {
  const parsedUrl = new URL(url);
  const domain = parsedUrl.hostname.split(".")[1];
  return extractionModels[domain];
}

export async function performScraping(
  url: string,
  extractionModel: ExtractionModelBase,
) {
  try {
    const $ = await fetchAndLoadData(url);
    const productDetails = extractionModel.extractProductDetails($);
    saveProductDetails(productDetails, url);
    return ScrapingStatus.success;
  } catch (e) {
    // console.log(e);
    return ScrapingStatus.failed;
  }
}
export async function fetchAndLoadData(url: string) {
  const { data } = await axios.get(url);
  return cheerio.load(data);
}

export function saveProductDetails(productDetails:  Omit<ProductDetails, "url">, url: string) {
  mockDb.set(productDetails.title, { ...productDetails, url });
}
export async function scrapeProductsDetails(urls: string[]) {
  const promises = urls.map(scrapeUrl);
  const result = await Promise.all(promises);
  return countScrapingStatus(result);
}

export function countScrapingStatus(
  result: ScrapingStatus[],
): ScrapingStatusCount {
  let successLength = 0;
  let failedLength = 0;

  result.forEach((item) => {
    if (item === ScrapingStatus.success) {
      successLength += 1;
    } else if (item === ScrapingStatus.failed) {
      failedLength += 1;
    }
  });

  return { successLength, failedLength };
}
