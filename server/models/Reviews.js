const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Reviews', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    artist_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Artists',
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
    tableName: 'Reviews',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Reviews_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
