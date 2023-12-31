const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../index");

const Exhibitions = sequelize.define(
    "Exhibitions",
    {
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    expiration_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    additional: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  module.exports = {Exhibitions};