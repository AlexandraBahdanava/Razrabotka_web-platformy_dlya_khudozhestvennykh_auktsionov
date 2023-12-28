const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AuthorizationData', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    login: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'AuthorizationData',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "AuthorizationData_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
