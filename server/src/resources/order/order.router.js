const { Router } = require("express");
const { getAllOrders, getOrder, markAsShipped } = require("./order.controller");
const { adminOnly, auth, exists } = require("../middlewares");
const { OrderModel } = require("./order.model");

const orderRouter = Router()
  .get("/orders", auth, getAllOrders)
  .get("/orders/:id", auth, exists(OrderModel), getOrder)
  .put("/orders/:id", auth, adminOnly, markAsShipped);

module.exports = { orderRouter };
