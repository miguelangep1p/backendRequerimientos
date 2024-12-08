const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

const Padre = sequelize.define('Padre', {

    idPadre: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    primerNombre: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    ApellidoPaterno: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    ApellidoMaterno: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    direccion:{
        type: DataTypes.TEXT,
        allowNull: false
    },

    telefono: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    email:{
        type: DataTypes.TEXT,
        allowNull: false
    },

    dni: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    idAlumno: {
        type: DataTypes.BIGINT,
        references: {
            model: 'Alumno',
            key: 'idAlumno'
        }
    },

    ubicacion:{
        type: DataTypes.TEXT
    }

}, 
{
    tableName: 'Padre',
    timestamps: false
});

module.exports = Padre;
