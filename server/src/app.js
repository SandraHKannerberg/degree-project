const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieSession = require("cookie-session");
const crypto = require("crypto");

require("express-async-errors");

const { productRouter } = require("./resources/product/product.router");
const { categoryRouter } = require("./resources/category/category.router");
const { userRouter } = require("./resources/user/user.router");
const { checkOutRouter } = require("./resources/checkout/checkout.router");
const { orderRouter } = require("./resources/order/order.router");

const { errorRequestHandler } = require("./error");

// Keys
const cookieSecretKey = process.env.COOKIE_SECRET_KEY;
const CLIENT_URL = process.env.CLIENT_URL;
const DOMAIN = process.env.DOMAIN;

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use(cors({
  origin: CLIENT_URL,
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Access-Control-Allow-Origin',
    'Content-Type',
    'Authorization'
  ]
}));

app.use(
  cookieSession({
    name: "_session",
    keys: [cookieSecretKey],
    maxAge: 1000 * 60 * 60 * 24, // 24 Hours
    sameSite: "strict",
    httpOnly: true,
    secure: false,
    path: '/',
    domain: [DOMAIN],
  })
);

// Test
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Add routers
app.use("/api", productRouter);
app.use("/api", categoryRouter);
app.use("/api", userRouter);
app.use("/api", checkOutRouter);
app.use("/api", orderRouter);

// Error
// app.use((req, res) => {
//   console.log("404-ERROR OCCURED: Missing Resource");
//   res.status(404).json("Missing resource");
// });

// Error handler
app.use(errorRequestHandler);

module.exports = { app };
