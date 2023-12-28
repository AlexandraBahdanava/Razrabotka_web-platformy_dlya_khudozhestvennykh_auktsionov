const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FeaturedArtists', {
    collector_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Collectors',
        key: 'id'
      }
    },
    artist_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Artists',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'FeaturedArtists',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "FeaturedArtists_pkey",
        unique: true,
        fields: [
          { name: "collector_id" },
          { name: "artist_id" },
        ]
      },
    ]
  });
};
