"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = require("sequelize");
var sequelize = new _sequelize.Sequelize('tesoreriadb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});
var Alumno = sequelize.define('Alumno', {
  idAlumno: {
    type: _sequelize.DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  primerNombre: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: false
  },
  otrosNombres: {
    type: _sequelize.DataTypes.TEXT
  },
  ApellidoPaterno: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: false
  },
  ApellidoMaterno: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: false
  },
  anio: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false
  },
  seccion: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: false
  },
  periodo: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: false
  },
  estado: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: false
  },
  imagen_perfil: {
    type: _sequelize.DataTypes.TEXT
  }
}, {
  tableName: 'Alumno',
  timestamps: false
});
var _default = exports["default"] = Alumno;