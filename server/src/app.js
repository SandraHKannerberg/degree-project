const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
require("express-async-errors");

const { productRouter } = require("./resources/product/product.router");
const { categoryRouter } = require("./resources/category/category.router");
const { userRouter } = require("./resources/user/user.router");

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(
  cookieSession({
    name: "session",
    keys: ["aVeryS3cr3tK3y"],
    maxAge: 1000 * 60 * 60 * 24, // 24 Hours
    sameSite: "strict",
    httpOnly: true,
    secure: false,
  })
);

// Add routers
app.use("/api", productRouter);
app.use("/api", categoryRouter);
app.use("/api", userRouter);

module.exports = { app };
