const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../index");

const Collectors = sequelize.define(
    "Collectors",
    {
    phone: {
      type: DataTypes.TEXT,
      allowNull: true
    },
   
  },
  );
  module.exports = {Collectors};