const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../index");

const ExhibitedPaintings = sequelize.define(
    "ExhibitedPaintings",
    {
    photo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "Без названия"
    },
   
  });
  module.exports = {ExhibitedPaintings};
