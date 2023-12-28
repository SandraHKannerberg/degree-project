const { Router } = require("express");
const {
  getAllProducts,
  getProduct,
  getProductsByCategory,
  addProduct,
} = require("./product.controller");

const { exists } = require("../middlewares");

const {
  ProductCreateValidationSchema,
  ProductUpdateValidationSchema,
  ProductModel,
} = require("./product.model");

const { CategoryModel } = require("../category/category.model");

const productRouter = Router()
  .get("/products", getAllProducts)
  .get("/products/:id", exists(ProductModel), getProduct)
  .get("/products/byCategory/:id", exists(CategoryModel), getProductsByCategory)
  .post("/products", addProduct);

module.exports = { productRouter };
