const { Router } = require("express");
const {
  createCheckOutSession,
  verifySession,
} = require("../checkout/checkout.controller");

const checkOutRouter = Router()
  .post("/create-checkout-session", createCheckOutSession)
  .post("/verify-session", verifySession);

module.exports = { checkOutRouter };
