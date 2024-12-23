"use strict";

const router = require("express").Router();
const {
  register,
  login,
  getAllUsers,
  updateUser,
  deleteUser
} = require("../controllers/auth.controller");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints para autenticación de usuarios
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Registrar un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               businessName:
 *                 type: string
 *                 example: "ESCUADRON SECURITY S.A.C."
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               jobTitle:
 *                 type: string
 *                 example: "Gerente General"
 *               phone:
 *                 type: string
 *                 example: "962028767"
 *               username:
 *                 type: string
 *                 example: "DUCZ69"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post("/register", register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Iniciar sesión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       400:
 *         description: Error en la solicitud
 */
router.post("/login", login);

/**
 * @swagger
 * /api/auth/users:
 *   get:
 *     tags: [Auth]
 *     summary: Obtener una lista de todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Error en la solicitud
 *       401:
 *         description: No autorizado, si se implementa control de acceso
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         email:
 *           type: string
 *           example: "john.doe@example.com"
 *         businessName:
 *           type: string
 *           example: "ESCUADRON SECURITY S.A.C."
 *         name:
 *           type: string
 *           example: "John Doe"
 *         jobTitle:
 *           type: string
 *           example: "Gerente General"
 *         phone:
 *           type: string
 *           example: "962028767"
 *         username:
 *           type: string
 *           example: "DUCZ69"
 */
router.get("/users", getAllUsers);

/**
 * @swagger
 * /api/auth/users/{id}:
 *   put:
 *     tags: [Auth]
 *     summary: Actualizar un usuario existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john.updated@example.com"
 *               username:
 *                 type: string
 *                 example: "UpdatedUsername"
 *               password:
 *                 type: string
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.put("/users/:id", updateUser);

/**
 * @swagger
 * /api/auth/users/{id}:
 *   delete:
 *     tags: [Auth]
 *     summary: Eliminar un usuario existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.delete("/users/:id", deleteUser);
module.exports = {
  AuthRoutes: router
};