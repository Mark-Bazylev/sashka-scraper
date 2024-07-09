import { describe, expect, test } from "bun:test";
import { scrapeProductsDetails } from "../services/scraping.service";
import { getFilteredProducts } from "../services/products.service";
import { mockDb } from "../db/productsDetailsDb";

const urlList = [
  "https://www.amazon.com/Samsung-Galaxy-Watch-Active2-Stainless/dp/B07VGQ78TR/",
  "https://www.ebay.com/itm/154758671631?epid=19036945722&hash=item2408df52df:g:9qYAAOSwB79g5M7P",
  "https://www.amazon.com/Anker-PowerCore-Portable-Charger-Compact/dp/B01N9RS20C/",
  "https://www.ebay.com/itm/184605728307?epid=21034721412&hash=item2afdbdbe33:g:kpoAAOSwOwtf8xMn",
];

describe("Products", async () => {
  await scrapeProductsDetails(urlList);
  let search: string;
  describe("getFilteredProducts", () => {
    const dbArray = Array.from(mockDb.values());
    test("withoutQuery", () => {
      const result = getFilteredProducts();
      expect(result).toEqual(dbArray);
    });
    test("withQuery", () => {
      search = "n";
      const result = getFilteredProducts(search);
      expect(result).toEqual(
        dbArray.filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    });
  });
});
