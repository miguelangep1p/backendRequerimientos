"use strict";

var _require = require('sequelize'),
  Sequelize = _require.Sequelize,
  DataTypes = _require.DataTypes;
var sequelize = new Sequelize('tesoreriadb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});
var Detalle_Pago = sequelize.define('Detalle_Pago', {
  idDetalle_Pago: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  idPago: {
    type: DataTypes.BIGINT,
    references: {
      model: 'Pago',
      key: 'idPago'
    }
  },
  idDeuda: {
    type: DataTypes.BIGINT,
    references: {
      model: 'Deuda',
      key: 'idDeuda'
    }
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'Detalle_Pago',
  timestamps: false
});
module.exports = Detalle_Pago;