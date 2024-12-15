"use strict";

var _require = require('sequelize'),
  Sequelize = _require.Sequelize,
  DataTypes = _require.DataTypes;
var sequelize = new Sequelize('tesoreriadb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});
var Recibo = sequelize.define('Recibo', {
  idRecibo: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  idAlumno: {
    type: DataTypes.BIGINT,
    references: {
      model: 'Alumno',
      key: 'idAlumno'
    }
  },
  idDeuda: {
    type: DataTypes.BIGINT,
    references: {
      model: 'Deuda',
      key: 'idDeuda'
    }
  },
  formaPago: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  nOperacion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  fechaEmision: {
    type: DataTypes.DATE,
    allowNull: false
  },
  importe: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'Recibo',
  timestamps: false
});
module.exports = Recibo;