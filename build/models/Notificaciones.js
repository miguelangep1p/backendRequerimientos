"use strict";

var _require = require('sequelize'),
  Sequelize = _require.Sequelize,
  DataTypes = _require.DataTypes;
var sequelize = new Sequelize('tesoreriadb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});
var Notificaciones = sequelize.define('Notificaciones', {
  idNotificacion: {
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
  idPadre: {
    type: DataTypes.BIGINT,
    references: {
      model: 'Padre',
      key: 'idPadre'
    }
  },
  idDeuda: {
    type: DataTypes.BIGINT,
    references: {
      model: 'Deuda',
      key: 'idDeuda'
    }
  },
  tipo: {
    type: DataTypes.ENUM('Deuda', 'General', 'Aviso'),
    defaultValue: 'General'
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  fechaNotificacion: {
    type: DataTypes.DATE,
    allowNull: false
  },
  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  tableName: 'Notificaciones',
  timestamps: false
});
module.exports = Notificaciones;