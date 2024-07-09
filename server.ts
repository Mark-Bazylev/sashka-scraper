//must be before imports so that env will be already configured
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { getProducts, scrapeProducts } from "./src/controllers/products";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/api/scrape", scrapeProducts);
app.get("/api/get-products", getProducts);

app.listen(PORT, () => {
  console.log(`port is listening on ${PORT}`);
});
