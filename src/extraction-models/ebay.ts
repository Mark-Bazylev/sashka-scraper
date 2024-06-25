import {
  ExtractionModelBase,
  ProductDetailsExtractionFn,
} from "./extraction-model-base";

const extractEbayProductDetails: ProductDetailsExtractionFn = ($) => {
  const title = $(".x-item-title__mainTitle").text().trim();
  const price = $(".x-price-primary").text().trim();
  return { title, price };
};

export const ebayExtractionModel: ExtractionModelBase = {
  extractProductDetails: extractEbayProductDetails,
};
