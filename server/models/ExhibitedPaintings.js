const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ExhibitedPaintings', {
    photo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "Без названия"
    },
    artist_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Artists',
        key: 'id'
      }
    },
    exhibitions_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Exhibitions',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'ExhibitedPaintings',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "ExhibitedPaintings_pkey",
        unique: true,
        fields: [
          { name: "artist_id" },
          { name: "exhibitions_id" },
        ]
      },
    ]
  });
};
