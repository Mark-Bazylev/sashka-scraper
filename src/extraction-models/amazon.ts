import { ExtractionModelBase } from "./extraction-model-base";

class AmazonExtractionModel implements ExtractionModelBase {
  extractProductDetails($:any) {
    const title = $("#productTitle").text().trim();
    const price = $(".a-offscreen").first().text().trim();
    return { title, price };
  }
}

export const amazonExtractionModel = new AmazonExtractionModel()