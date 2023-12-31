const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../index");

const Rates = sequelize.define(
    "Rates",
    {
    bet_size: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
   
  });
  module.exports = {Rates};
