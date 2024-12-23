"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PORT = exports.DB_USER = exports.DB_PORT = exports.DB_PASSWORD = exports.DB_HOST = exports.DB_DATABASE = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();
const PORT = exports.PORT = process.env.PORT || 3000;
const DB_USER = exports.DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = exports.DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_HOST = exports.DB_HOST = process.env.DB_HOST || 'localhost';
const DB_DATABASE = exports.DB_DATABASE = process.env.DB_DATABASE || 'tesoreriadb';
const DB_PORT = exports.DB_PORT = process.env.DB_PORT || 3306;