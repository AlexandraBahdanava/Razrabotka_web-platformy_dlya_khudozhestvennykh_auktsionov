const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../index");

const Artists = sequelize.define(
    "Artists",
    {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    about_artist: {
      type: DataTypes.STRING,
      allowNull: true
    },
  },
);
    module.exports = {Artists};