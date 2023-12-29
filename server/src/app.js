const express = require("express");
const cors = require("cors");

const { productRouter } = require("./resources/product/product.router");
const { categoryRouter } = require("./resources/category/category.router");

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

// Add routers
app.use("/api", productRouter);
app.use("/api", categoryRouter);

module.exports = { app };
