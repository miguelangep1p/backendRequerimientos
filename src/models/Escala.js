const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('tesoreriadb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
const Escala = sequelize.define('Escala', {

    idEscala: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    escala: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    monto: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    }

}, 
{
    
    tableName: 'Escala',
    timestamps: false
});

module.exports = Escala;
