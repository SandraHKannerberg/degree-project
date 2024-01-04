const express = require("express");
const {
  registerNewUser,
  login,
  logout,
  authorize,
} = require("./user.controller");
const { UserCreateValidationSchema } = require("./user.model");
const { validate } = require("../middlewares");

const userRouter = express
  .Router()
  .post(
    "/users/register",
    validate(UserCreateValidationSchema),
    registerNewUser
  )
  .post("/users/login", login)
  .post("/users/logout", logout)
  .get("/users/authorize", authorize);

module.exports = { userRouter };
