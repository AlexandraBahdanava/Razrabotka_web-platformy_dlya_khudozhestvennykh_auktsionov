const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../index");

const Reviews = sequelize.define(
    "Reviews",
    {
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
   
  });
  module.exports = {Reviews};
