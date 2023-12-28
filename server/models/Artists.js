const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Artists', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    country: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    city: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    about_artist: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    authorization_data_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'AuthorizationData',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Artists',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Artists_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "unique_authorization_data_artists_id",
        unique: true,
        fields: [
          { name: "authorization_data_id" },
        ]
      },
    ]
  });
};
