const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

const Asignar_Concepto = sequelize.define('Asignar_Concepto', {

    idAsignar_Concepto: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    concepto: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    idEscala:{
        type: DataTypes.BIGINT,
        references:{
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
    },

}, {
    // Other model options go here
    tableName: 'Asignar_Concepto',
    timestamps: false
});

module.exports = Asignar_Concepto;