import * as cheerio from "cheerio";
import { ProductDetails } from "../models/product-details";

export interface ExtractionModelBase {
  extractProductDetails: (
    $: ReturnType<typeof cheerio.load>,
  ) => Omit<ProductDetails, "url">;
}
