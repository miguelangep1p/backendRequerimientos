"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequelize = void 0;
var _sequelize = require("sequelize");
var _config = require("./config.js");
// Crear instancia de Sequelize
const sequelize = exports.sequelize = new _sequelize.Sequelize(_config.DB_DATABASE, _config.DB_USER, _config.DB_PASSWORD, {
  host: _config.DB_HOST,
  port: _config.DB_PORT,
  dialect: 'mysql'
});

// Probar conexión
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a MySQL establecida con éxito.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
})();
module.exports = sequelize;