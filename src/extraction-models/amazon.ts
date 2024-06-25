import {
  ExtractionModelBase,
  ProductDetailsExtractionFn,
} from "./extraction-model-base";

const extractAmazonProductDetails: ProductDetailsExtractionFn = ($) => {
  const title = $("#productTitle").text().trim();
  const price = $(".a-offscreen").first().text().trim();
  return { title, price };
};

export const amazonExtractionModel: ExtractionModelBase = {
  extractProductDetails: extractAmazonProductDetails,
};
