const { Router } = require("express");
const {
  getAllProducts,
  getProduct,
  addProduct,
} = require("./product.controller");

const { exists } = require("../middlewares");

const {
  ProductCreateValidationSchema,
  ProductUpdateValidationSchema,
  ProductModel,
} = require("./product.model");

const productRouter = Router()
  .get("/products", getAllProducts)
  .get("/products/:id", exists(ProductModel), getProduct)
  .post("/products", addProduct);

module.exports = { productRouter };
