"use strict";

const {
  Sequelize,
  DataTypes
} = require('sequelize');
const sequelize = new Sequelize('tesoreriadb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});
const Asignar_Escala = sequelize.define('Asignar_Escala', {
  idAsignarEscala: {
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
  idEscala: {
    type: DataTypes.BIGINT,
    references: {
      model: 'Escala',
      key: 'idEscala'
    }
  },
  fechaAsignacion: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'Asignar_Escala',
  timestamps: false
});
module.exports = Asignar_Escala;