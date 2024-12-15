"use strict";

var _require = require("sequelize"),
  DataTypes = _require.DataTypes;
var sequelize = require("../database");
var User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  roleId: {
    type: DataTypes.BIGINT,
    references: {
      model: 'Role',
      key: 'roleId'
    }
  }
}, {
  tableName: "users",
  timestamps: true
});
module.exports = {
  User: User
};