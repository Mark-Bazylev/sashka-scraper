import { ExtractionModelBase } from "./extraction-model-base";
import cheerio from "cheerio";
import { ProductDetails } from "../models/product-details";

const extractAmazonProductDetails = (
  $: ReturnType<typeof cheerio.load>,
): Omit<ProductDetails, "url"> => {
  const title = $("#productTitle").text().trim();
  const price = $(".a-offscreen").first().text().trim();
  return { title, price };
};

export const amazonExtractionModel: ExtractionModelBase = {
  extractProductDetails: extractAmazonProductDetails,
};
