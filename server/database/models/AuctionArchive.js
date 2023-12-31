const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../index");

const AuctionArchive = sequelize.define(
    "AuctionArchive",
    {
    closing_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    selling_price: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "https:\/\/upload.wikimedia.org\/wikipedia\/commons\/2\/2f\/No-photo-m.png"
    },
  },
  );
  module.exports = {AuctionArchive};
