const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

const Historial_Cambios = sequelize.define('Historial_Cambios', {

    idCambio: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },

    idAsignarEscala: {
        type: DataTypes.BIGINT,
        references: {
            model: 'Asignar_Escala',
            key: 'idAsignarEscala'
        }
    },

    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    fechaCambio: {
        type: DataTypes.DATE,
        allowNull: false
    }

}, {
    tableName: 'Historial_Cambios',
    timestamps: false
});

module.exports = Historial_Cambios;