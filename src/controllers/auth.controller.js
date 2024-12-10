const { badRequest, success } = require("../utils/response-types");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { User } = require("../models/user.model.js");
const { Op } = require("sequelize");

// Validación para el registro
const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "El correo electrónico no tiene un formato válido.",
    "any.required": "El correo electrónico es obligatorio.",
  }),
  username: Joi.string().required().messages({
    "any.required": "El nombre de usuario es obligatorio.",
  }),
  password: Joi.string().min(6).max(1024).required().messages({
    "string.min": "La contraseña debe tener al menos {#limit} caracteres.",
    "any.required": "La contraseña es obligatoria.",
  }),
});

exports.register = async (req, res) => {
  // Validar los datos antes de crear un usuario
  const { error } = registerSchema.validate(req.body);
  if (error) return badRequest(res, error.details[0].message);

  const { email, username, password } = req.body;

  // Verificar si el usuario ya existe
  const emailExist = await User.findOne({ where: { email } });
  if (emailExist) return badRequest(res, "El correo ya está registrado");

  const usernameExist = await User.findOne({ where: { username } });
  if (usernameExist) return badRequest(res, "El nombre de usuario ya está registrado");

  // Hashear la contraseña
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Crear un nuevo usuario
  const user = User.build({
    email,
    username,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    success(res, {
      ...savedUser.dataValues,
      password: null,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

// Validación para el inicio de sesión
const loginSchema = Joi.object({
  usernameOrEmail: Joi.string().required().messages({
    "any.required": "El correo electrónico o nombre de usuario es obligatorio.",
  }),
  password: Joi.string().min(6).max(1024).required().messages({
    "string.min": "La contraseña debe tener al menos {#limit} caracteres.",
    "any.required": "La contraseña es obligatoria.",
  }),
});

exports.login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return badRequest(res, error.details[0].message);

  const { usernameOrEmail, password } = req.body;

  // Verificar si el usuario existe por correo o nombre de usuario
  const user = await User.findOne({
    where: {
      [Op.or]: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    },
  });

  if (!user) return badRequest(res, "Usuario no registrado");

  // Verificar la contraseña
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return badRequest(res, "Credenciales inválidas");

  // Convertir la instancia de Sequelize a un objeto plano
  const userWithoutPassword = user.toJSON();
  delete userWithoutPassword.password;

  // Crear y asignar un token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  success(res.header("auth-token", token), {
    token,
    user: userWithoutPassword,
  });
};
