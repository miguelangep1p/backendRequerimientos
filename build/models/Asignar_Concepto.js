"use strict";

var _require = require('sequelize'),
  Sequelize = _require.Sequelize,
  DataTypes = _require.DataTypes;
var sequelize = new Sequelize('tesoreriadb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});
var Asignar_Concepto = sequelize.define('Asignar_Concepto', {
  idAsignar_Concepto: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  idEscala: {
    type: DataTypes.BIGINT,
    references: {
      model: 'Escala',
      key: 'idEscala'
    }
  },
  idConcepto: {
    type: DataTypes.BIGINT,
    references: {
      model: 'Concepto',
      key: 'idConcepto'
    }
  }
}, {
  tableName: 'Asignar_Concepto',
  timestamps: false
});
module.exports = Asignar_Concepto;