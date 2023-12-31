const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../index");

const AuthorizationData = sequelize.define(
    "AuthorizationData",
    {
    email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    login: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  );
  
  module.exports = {AuthorizationData};
