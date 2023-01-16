const express = require("express");
const {
  getListPoduct,
  getFormAddProduct,
  addProduct,
  deleteProduct,
  detailProduct,
  getFormUpdateProduct,
  updateProduct,
} = require("../controllers/product.controller");
const handleUpload = require("../middlewares/upload/upload_image");
const productRouter = express.Router();
productRouter.get("/", getListPoduct);
productRouter.get("/create", getFormAddProduct);
productRouter.post("/create", handleUpload(), addProduct);
productRouter.get("/delete/:id", deleteProduct);
productRouter.get("/detail/:id", detailProduct);
productRouter.get("/update/:id", getFormUpdateProduct);
productRouter.get("/detail/:id", detailProduct);
productRouter.post("/update", handleUpload(), updateProduct);
module.exports = productRouter;
