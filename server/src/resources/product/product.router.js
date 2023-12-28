const { Router } = require("express");
const { getAllProducts, addProduct } = require("./product.controller");

const productRouter = Router()
  .get("/products", getAllProducts)
  .post("/products", addProduct);

module.exports = { productRouter };
