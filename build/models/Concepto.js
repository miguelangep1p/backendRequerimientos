"use strict";

const {
  Sequelize,
  DataTypes
} = require('sequelize');
const sequelize = new Sequelize('tesoreriadb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});
const Concepto = sequelize.define('Concepto', {
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