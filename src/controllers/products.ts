import { Request, Response } from "express";
import { scrapeProductsDetails } from "../services/scraping.service";
import { urlList } from "../db/productsDetailsDb";
import { StatusCodes } from "http-status-codes";
import { getFilteredProducts } from "../services/products.service";

export async function scrapeProducts(req: Request, res: Response) {
  const result = await scrapeProductsDetails(urlList);
  res.status(StatusCodes.OK).render("scrape-response", { result });
}

export async function getProducts(req: Request, res: Response) {
  const { search } = req.query as Record<string, string>;
  const products = getFilteredProducts(search);
  res.status(StatusCodes.OK).render("products-list", { products });
}
