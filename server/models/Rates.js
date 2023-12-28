const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Rates', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    bet_size: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: false
    },
    auction_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Auctions',
        key: 'id'
      }
    },
    collector_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Collectors',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Rates',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Rates_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
