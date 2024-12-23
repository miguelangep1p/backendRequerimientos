"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.register = exports.getAllUsers = exports.deleteUser = void 0;
var _responseTypes = require("../utils/response-types");
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _joi = _interopRequireDefault(require("joi"));
var _userModel = require("../models/user.model.js");
var _roleModel = require("../models/role.model.js");
var _sequelize = require("sequelize");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Ajusta la ruta según tu estructura de directorios

// Validación para el registro
const registerSchema = _joi.default.object({
  email: _joi.default.string().email().required().messages({
    "string.email": "El correo electrónico no tiene un formato válido.",
    "any.required": "El correo electrónico es obligatorio."
  }),
  username: _joi.default.string().required().messages({
    "any.required": "El nombre de usuario es obligatorio."
  }),
  password: _joi.default.string().min(6).max(1024).required().messages({
    "string.min": "La contraseña debe tener al menos {#limit} caracteres.",
    "any.required": "La contraseña es obligatoria."
  })
});
const register = async (req, res) => {
  // Validar los datos antes de crear un usuario
  const {
    error
  } = registerSchema.validate(req.body);
  if (error) return (0, _responseTypes.badRequest)(res, error.details[0].message);
  const {
    email,
    username,
    password
  } = req.body;

  // Verificar si el usuario ya existe
  const emailExist = await _userModel.User.findOne({
    where: {
      email
    }
  });
  if (emailExist) return (0, _responseTypes.badRequest)(res, "El correo ya está registrado");
  const usernameExist = await _userModel.User.findOne({
    where: {
      username
    }
  });
  if (usernameExist) return (0, _responseTypes.badRequest)(res, "El nombre de usuario ya está registrado");

  // Hashear la contraseña
  const salt = await _bcryptjs.default.genSalt(10);
  const hashedPassword = await _bcryptjs.default.hash(password, salt);

  // Crear un nuevo usuario
  const user = _userModel.User.build({
    email,
    username,
    password: hashedPassword,
    roleId: 1
  });
  try {
    const savedUser = await user.save();
    (0, _responseTypes.success)(res, {
      ...savedUser.dataValues
    });
  } catch (err) {
    res.status(400).send(err);
  }
};
exports.register = register;
const loginSchema = _joi.default.object({
  email: _joi.default.string().min(3).max(255).required().messages({
    "string.min": "El correo debe tener al menos {#limit} caracteres.",
    "any.required": "El correo electrónico o usuario es obligatorio."
  }),
  password: _joi.default.string().min(6).max(1024).required().messages({
    "string.min": "La contraseña debe tener al menos {#limit} caracteres.",
    "any.required": "La contraseña es obligatoria."
  })
});
exports.login = async (req, res) => {
  const {
    error
  } = loginSchema.validate(req.body);
  if (error) return (0, _responseTypes.badRequest)(res, error.details[0].message);
  const {
    email,
    password
  } = req.body;

  // Verificar si el email existe
  const user = await _userModel.User.findOne({
    where: {
      [_sequelize.Op.or]: [{
        email
      }, {
        username: email
      }]
    }
  });
  if (!user) return (0, _responseTypes.badRequest)(res, "Aún no estas registrado");

  // Verificar la contraseña
  const validPass = await _bcryptjs.default.compare(password, user.password);
  if (!validPass) return (0, _responseTypes.badRequest)(res, "Credenciales inválidas");

  // Convertir la instancia de Sequelize a un objeto plano
  const userWithoutPassword = user.toJSON();
  delete userWithoutPassword.password;

  // Informacion de rol del usuario
  const role = await _roleModel.Role.findOne({
    where: {
      roleId: user.roleId
    }
  });

  // Crear y asignar un token
  const token = _jsonwebtoken.default.sign({
    id: user.id
  }, process.env.JWT_SECRET);
  (0, _responseTypes.success)(res.header("auth-token", token), {
    token,
    user: userWithoutPassword,
    role
  });
};
const getAllUsers = async (req, res) => {
  try {
    const users = await _userModel.User.findAll({
      attributes: {
        exclude: ['password']
      } // Excluir la contraseña por seguridad
    });
    if (users.length > 0) {
      (0, _responseTypes.success)(res, users);
    } else {
      (0, _responseTypes.badRequest)(res, "No se encontraron usuarios.");
    }
  } catch (err) {
    res.status(500).send({
      message: "Error al obtener los usuarios: " + err.message
    });
  }
};

// Método para actualizar un usuario
exports.getAllUsers = getAllUsers;
const updateUserSchema = _joi.default.object({
  email: _joi.default.string().email().messages({
    "string.email": "El correo electrónico no tiene un formato válido."
  }),
  username: _joi.default.string().messages({
    "string.base": "El nombre de usuario debe ser un texto."
  }),
  password: _joi.default.string().min(6).max(1024).messages({
    "string.min": "La contraseña debe tener al menos {#limit} caracteres."
  })
});
const updateUser = async (req, res) => {
  const {
    id
  } = req.params; // ID del usuario a actualizar

  // Validar los datos antes de actualizar
  const {
    error
  } = updateUserSchema.validate(req.body);
  if (error) return (0, _responseTypes.badRequest)(res, error.details[0].message);
  const {
    email,
    username,
    password
  } = req.body;
  try {
    // Buscar el usuario por ID
    const user = await _userModel.User.findByPk(id);
    if (!user) return (0, _responseTypes.badRequest)(res, "Usuario no encontrado");

    // Verificar si el correo ya está en uso por otro usuario
    if (email && email !== user.email) {
      const emailExist = await _userModel.User.findOne({
        where: {
          email
        }
      });
      if (emailExist) return (0, _responseTypes.badRequest)(res, "El correo ya está registrado");
    }

    // Verificar si el nombre de usuario ya está en uso por otro usuario
    if (username && username !== user.username) {
      const usernameExist = await _userModel.User.findOne({
        where: {
          username
        }
      });
      if (usernameExist) return (0, _responseTypes.badRequest)(res, "El nombre de usuario ya está registrado");
    }

    // Actualizar los datos del usuario
    if (email) user.email = email;
    if (username) user.username = username;
    if (password) {
      const salt = await _bcryptjs.default.genSalt(10);
      user.password = await _bcryptjs.default.hash(password, salt);
    }
    const updatedUser = await user.save();
    (0, _responseTypes.success)(res, updatedUser);
  } catch (err) {
    res.status(500).send({
      message: "Error al actualizar el usuario: " + err.message
    });
  }
};

// Método para eliminar un usuario
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
  const {
    id
  } = req.params; // ID del usuario a eliminar

  try {
    // Buscar el usuario por ID
    const user = await _userModel.User.findByPk(id);
    if (!user) return (0, _responseTypes.badRequest)(res, "Usuario no encontrado");

    // Eliminar el usuario
    await user.destroy();
    (0, _responseTypes.success)(res, {
      message: "Usuario eliminado correctamente"
    });
  } catch (err) {
    res.status(500).send({
      message: "Error al eliminar el usuario: " + err.message
    });
  }
};
exports.deleteUser = deleteUser;