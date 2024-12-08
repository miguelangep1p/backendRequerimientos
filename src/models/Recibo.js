const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

const Recibo = sequelize.define('Recibo', {

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

    importe:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    }

}, 
{
    tableName: 'Recibo',
    timestamps: false
});

module.exports = Recibo;