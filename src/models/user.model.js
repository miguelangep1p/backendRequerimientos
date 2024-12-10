const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "users", // Nombre personalizado de la tabla
    timestamps: true, // Para `createdAt` y `updatedAt`
  }
);

module.exports = { User };

