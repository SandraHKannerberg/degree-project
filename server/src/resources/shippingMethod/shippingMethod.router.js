const express = require("express");
const {
  addShippingMethod,
  getAllShippingMethods,
} = require("./shippingMethod.controller");

const { adminOnly, auth } = require("../middlewares");
const shippingMethodRouter = express.Router();

shippingMethodRouter.get("/shippingMethod", getAllShippingMethods);
shippingMethodRouter.post(
  "/shippingMethod",
  auth,
  adminOnly,
  addShippingMethod
);

module.exports = { shippingMethodRouter };
