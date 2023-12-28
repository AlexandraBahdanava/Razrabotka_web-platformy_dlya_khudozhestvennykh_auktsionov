const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Collectors', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    phone: {
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
    tableName: 'Collectors',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Collectors_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "unique_authorization_data_id",
        unique: true,
        fields: [
          { name: "authorization_data_id" },
        ]
      },
    ]
  });
};
