const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../index");

const FeaturedArtists = sequelize.define(
    "FeaturedArtists",
    {
    collector_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    artist_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    }
  },
  );
  module.exports = {FeaturedArtists};
