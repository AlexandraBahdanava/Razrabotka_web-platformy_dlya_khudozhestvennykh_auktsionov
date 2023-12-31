const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../index");

const Portfolio = sequelize.define(
    "Portfolio",
    {
    photo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }
  );
  module.exports = {Portfolio};
