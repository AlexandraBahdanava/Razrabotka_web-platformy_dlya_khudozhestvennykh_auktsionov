const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AuctionArchive', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    closing_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    selling_price: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: false
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "https:\/\/upload.wikimedia.org\/wikipedia\/commons\/2\/2f\/No-photo-m.png"
    },
    artist_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Artists',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'AuctionArchive',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "AuctionArchive_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
