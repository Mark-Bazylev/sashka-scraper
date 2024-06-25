import * as cheerio from "cheerio";
import { ProductDetails } from "../models/product-details";

export type ProductDetailsExtractionFn = ($: ReturnType<typeof cheerio.load>) => Omit<ProductDetails, 'url'>

export interface ExtractionModelBase {
  extractProductDetails: ProductDetailsExtractionFn
}
