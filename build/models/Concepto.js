"use strict";

var _require = require('sequelize'),
  Sequelize = _require.Sequelize,
  DataTypes = _require.DataTypes;
var sequelize = new Sequelize('tesoreriadb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});
var Concepto = sequelize.define('Concepto', {
  idConcepto: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  concepto: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'Concepto',
  timestamps: false
});
module.exports = Concepto;