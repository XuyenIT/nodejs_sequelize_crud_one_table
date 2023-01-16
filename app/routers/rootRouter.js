const express = require("express");
const productRouter = require("./product.router");
const rootRouter = express.Router();
rootRouter.use("/product", productRouter);
module.exports = rootRouter;
