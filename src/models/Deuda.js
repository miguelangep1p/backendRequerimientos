const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

const Deuda = sequelize.define('Deuda', {

    idDeuda: {
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

    idAsignarEscala:{
        type: DataTypes.BIGINT,
        references:{
            model: 'Asignar_Escala',
            key: 'idAsignarEscala'
        }
    },

    idAsignar_Concepto:{
        type: DataTypes.BIGINT,
        references:{
            model: 'Asignar_Concepto',
            key: 'idAsignar_Concepto'
        }
    },

    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    }
    
}, {

    tableName: 'Deuda',
    timestamps: false
});

module.exports = Deuda;