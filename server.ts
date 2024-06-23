//must be before imports so that env will be already configured
import dotenv from "dotenv";
dotenv.config()

import express from "express";
import {getProducts, scrapeProducts} from "./src/controllers/products";


const app = express();
const PORT = 3000;

app.get("/scrape", scrapeProducts);
app.get("/getProducts", getProducts);


app.listen(PORT, () => {
  console.log(`port is listening on ${PORT}`);
});
