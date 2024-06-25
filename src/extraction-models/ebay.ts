import { ExtractionModelBase } from "./extraction-model-base";
import cheerio from "cheerio";
import {ProductDetails} from "../models/product-details";

const extractEbayProductDetails= ($: ReturnType<typeof cheerio.load>):Omit<ProductDetails, "url">  => {
  const title = $(".x-item-title__mainTitle").text().trim();
  const price = $(".x-price-primary").text().trim();
  return { title, price };
};

export const ebayExtractionModel: ExtractionModelBase = {
  extractProductDetails: extractEbayProductDetails,
};
