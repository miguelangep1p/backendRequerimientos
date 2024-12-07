const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

const Pago = sequelize.define('Pago', {

    idPago: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },

    idPadre: {
        type: DataTypes.BIGINT,
        references: {
            model: 'Padre',
            key: 'idPadre'
        }
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

    fechaPago: {
        type: DataTypes.DATE,
        allowNull: false
    },

    estadoPago: {
        type: DataTypes.TEXT,
        allowNull: false
    }

}, {

    tableName: 'Pago',
    timestamps: false
});

module.exports = Pago;