const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Portfolio', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    photo: {
      type: DataTypes.TEXT,
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
    tableName: 'Portfolio',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Paintings_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
