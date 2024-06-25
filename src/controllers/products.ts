import { Request, Response, NextFunction } from "express";
import {scrapeProductsDetails} from "../services/scraping.service";
import { mockDb, urlList } from "../db/productsDetailsDb";
import { StatusCodes } from "http-status-codes";

export async function scrapeProducts(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const result = await scrapeProductsDetails(urlList);
  res.status(StatusCodes.OK).json({ result });
}

export async function getProducts(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { search } = req.query as Record<string, string>;
  const results = Array.from(mockDb.values()).filter((productDetails) =>
    productDetails.title.toLowerCase().includes(search.toLowerCase()),
  );
  res.status(StatusCodes.OK).json({ results });
}
