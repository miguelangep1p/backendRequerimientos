"use strict";

var _require = require('sequelize'),
  Sequelize = _require.Sequelize,
  DataTypes = _require.DataTypes;
var sequelize = new Sequelize('tesoreriadb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});
var Condonacion = sequelize.define('Condonacion', {
  idCondonacion: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  idDeuda: {
    type: DataTypes.BIGINT,
    references: {
      model: 'Deuda',
      key: 'idDeuda'
    }
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'Condonacion',
  timestamps: false
});
module.exports = Condonacion;