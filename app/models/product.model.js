const { DataTypes } = require("sequelize");

const ProductModel = (sequelize) => {
  return sequelize.define(
    "Product",
    {
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5, 10],
            msg: "Chieu dai tu 5 den 10 ky tu",
          },
        },
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          max: {
            args: 100,
            msg: "Max Price is 100",
          },
          min: {
            args: 10,
            msg: "Min Price is 10",
          },
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: "products",
    }
  );
};
module.exports = ProductModel;
