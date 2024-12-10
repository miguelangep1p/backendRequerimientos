import { Sequelize } from 'sequelize';
import {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_DATABASE,
} from './config.js';

// Crear instancia de Sequelize
export const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
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