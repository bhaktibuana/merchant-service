const express = require("express");
const loginRouter = require("./login.route");
const merchantRouter = require("./merchant.route");
const productRouter = require("./product.route");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Merchant Service API Server.",
  });
});

module.exports = {
  index: router,
  loginRouter,
  merchantRouter,
  productRouter,
};
