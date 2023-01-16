const { Sequelize } = require("sequelize");
const ProductModel = require("./product.model");
const {
  DB,
  USER,
  PASSWORD,
  HOST,
  dialect,
  PORT,
} = require("../configs/db.config");

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: dialect,
  port: PORT,
});

const Product = ProductModel(sequelize);
module.exports = {
  Product,
  sequelize,
};
