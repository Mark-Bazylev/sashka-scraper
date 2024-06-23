import { ExtractionModelBase } from "./extraction-model-base";

class EbayExtractionModel implements ExtractionModelBase {
    extractProductDetails($:any) {
        const title = $(".x-item-title__mainTitle").text().trim();
        const price = $(".x-price-primary").text().trim();
        return { title, price };
    }
}

export const ebayExtractionModel= new EbayExtractionModel()