const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Auctions', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
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
      type: DataTypes.INTEGER,
      allowNull: false
    },
    starting_price: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: false
    },
    rate_step: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: false
    },
    bidding: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0
    },
    bidding_rate: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    auto_renewal: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false
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
    tableName: 'Auctions',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Auctions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
