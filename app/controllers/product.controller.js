const { Product } = require("../models");
const fs = require("fs");
let appPublicFolder = "app\\public";
let pathFile = "";
const getListPoduct = async (req, res) => {
  const listProduct = await Product.findAll();
  console.log("listProduct", listProduct);
  res.render("./product/list_product", { listProduct: listProduct });
};
const getFormAddProduct = (req, res) => {
  res.render("./product/add_product");
};
const addProduct = async (req, res) => {
  const { productName, price } = req.body;
  const { file } = req;
  pathFile = file.path.substr(appPublicFolder.length + 1);
  const product = {
    productName,
    price,
    image: pathFile,
  };
  await Product.create(product).then(
    function (rowDeleted) {
      // rowDeleted will return number of rows deleted
      if (rowDeleted == 1) {
        console.log("added successfully");
        res.redirect("/product");
      }
    },
    function (err) {
      req.session.message = {
        type: err.errors[0].path,
        message: err.errors[0].message,
      };
      console.log("type erro", err.errors[0]);
      res.redirect("/product/create");
    }
  );
};
const detailProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({
    where: {
      id,
    },
  });
  if (product) {
    res.render("./product/detail_product", { product: product });
  } else {
    return false;
  }
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({
    where: {
      id,
    },
  });
  await Product.destroy({
    where: {
      id: id, //this will be your id that you want to delete
    },
  }).then(
    function (rowDeleted) {
      // rowDeleted will return number of rows deleted
      if (rowDeleted == 1) {
        console.log("Deleted successfully");
        if (product) {
          fs.unlinkSync("./app/public/" + product.image);
        }

        res.redirect("/product");
      }
    },
    function (err) {
      console.log(err);
    }
  );
};
const getFormUpdateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({
    where: {
      id,
    },
  });
  if (product) {
    res.render("./product/update_product", { product: product });
  } else {
    return false;
  }
};
const updateProduct = async (req, res) => {
  const { id, productName, price } = req.body;
  console.log("id update", id);
  const { file } = req;
  let new_image = "";
  if (file) {
    new_image = file.path.substr(appPublicFolder.length + 1);
    try {
      fs.unlinkSync("./app/public/" + req.body.old_image);
    } catch (error) {
      console.log(error);
    }
  } else {
    new_image = req.body.old_image;
  }

  const newProduct = {
    productName,
    price,
    image: new_image,
  };
  await Product.update(newProduct, {
    where: {
      id: id,
    },
  }).then(
    function (rowDeleted) {
      // rowDeleted will return number of rows deleted
      if (rowDeleted == 1) {
        console.log("update successfully");
        res.redirect("/product");
      }
    },
    function (err) {
      console.log(err);
    }
  );
};
module.exports = {
  getListPoduct,
  getFormAddProduct,
  addProduct,
  detailProduct,
  deleteProduct,
  getFormUpdateProduct,
  updateProduct,
};
