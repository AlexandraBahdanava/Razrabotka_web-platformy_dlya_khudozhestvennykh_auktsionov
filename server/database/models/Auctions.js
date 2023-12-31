const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../index");

const Auctions = sequelize.define(
    "Auctions",
    {
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "Без названия"
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    genre: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    material: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    color: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    duration: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    starting_price: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    rate_step: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    bidding: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0
    },
    bidding_rate: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    auto_renewal: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false
    },
  
  }, 
  );
  module.exports = {Auctions};