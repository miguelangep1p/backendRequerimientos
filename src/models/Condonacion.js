const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

const Condonacion = sequelize.define('Condonacion', {

    idCondonacion: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    
    idDeuda: {
        type: DataTypes.BIGINT,
        references: {
            model: 'Deuda',
            key: 'idDeuda'
        }
    },

    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    
    tableName: 'Condonacion',
    timestamps: false
});

module.exports = Condonacion;