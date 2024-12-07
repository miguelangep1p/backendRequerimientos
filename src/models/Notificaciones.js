const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

const Notificaciones = sequelize.define('Notificaciones', {

    idNotificacion: {
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

    idPadre: {
        type: DataTypes.BIGINT,
        references: {
            model: 'Padre',
            key: 'idPadre'
        }
    },

    idDeuda: {
        type: DataTypes.BIGINT,
        references: {
            model: 'Deuda',
            key: 'idDeuda'
        }
    },

    tipo: {
        type: DataTypes.ENUM('Deuda', 'General', 'Aviso'),
        defaultValue: 'General'
    },

    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    fechaNotificacion: {
        type: DataTypes.DATE,
        allowNull: false
    },

    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
    
}, 
{
    tableName: 'Notificaciones',
    timestamps: false
});

module.exports = Notificaciones;