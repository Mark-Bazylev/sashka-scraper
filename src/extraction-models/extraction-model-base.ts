import * as cheerio from "cheerio";
import { ProductDetails } from "../models/product-details";
import * as url from "url";

export interface ExtractionModelBase {
  extractProductDetails: (
    $: ReturnType<typeof cheerio.load>,
  ) => Omit<ProductDetails, "url">;
}
