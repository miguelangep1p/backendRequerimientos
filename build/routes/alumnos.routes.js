"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _express = require("express");
var alumnosCtrl = _interopRequireWildcard(require("../controllers/alumnos.controller"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var router = (0, _express.Router)();

/**
 * @swagger
 * components:
 *   schemas:
 *     Alumno:
 *       type: object
 *       description: Esquema completo de un alumno, incluyendo el ID generado automáticamente.
 *       properties:
 *         idAlumno:
 *           type: integer
 *           example: 1
 *           description: Identificador único del alumno.
 *         primerNombre:
 *           type: string
 *           example: Juan
 *           description: Primer nombre del alumno.
 *         otrosNombres:
 *           type: string
 *           example: Carlos
 *           description: Otros nombres del alumno (opcional).
 *         ApellidoPaterno:
 *           type: string
 *           example: Pérez
 *           description: Apellido paterno del alumno.
 *         ApellidoMaterno:
 *           type: string
 *           example: García
 *           description: Apellido materno del alumno.
 *         anio:
 *           type: integer
 *           example: 2023
 *           description: Año de estudio del alumno.
 *         seccion:
 *           type: string
 *           example: A
 *           description: Sección del alumno.
 *         periodo:
 *           type: string
 *           example: "2023-2024"
 *           description: Periodo académico del alumno.
 *         estado:
 *           type: string
 *           example: Activo
 *           description: Estado actual del alumno.
 *         imagen_perfil:
 *           type: string
 *           format: uri
 *           example: https://example.com/perfiles/1.jpg
 *           description: URL de la imagen de perfil del alumno.
 * 
 *     AlumnoSinId:
 *       type: object
 *       description: Esquema de un alumno sin el campo de ID, usado para solicitudes de creación o actualización.
 *       properties:
 *         primerNombre:
 *           type: string
 *           example: Juan
 *           description: Primer nombre del alumno.
 *         otrosNombres:
 *           type: string
 *           example: Carlos
 *           description: Otros nombres del alumno (opcional).
 *         ApellidoPaterno:
 *           type: string
 *           example: Pérez
 *           description: Apellido paterno del alumno.
 *         ApellidoMaterno:
 *           type: string
 *           example: García
 *           description: Apellido materno del alumno.
 *         anio:
 *           type: integer
 *           example: 2023
 *           description: Año de estudio del alumno.
 *         seccion:
 *           type: string
 *           example: A
 *           description: Sección del alumno.
 *         periodo:
 *           type: string
 *           example: "2023-2024"
 *           description: Periodo académico del alumno.
 *         estado:
 *           type: string
 *           example: Activo
 *           description: Estado actual del alumno.
 *         imagen_perfil:
 *           type: string
 *           format: uri
 *           example: https://example.com/perfiles/1.jpg
 *           description: URL de la imagen de perfil del alumno.
 */

/**
 * @swagger
 * /api/alumnos:
 *   get:
 *     summary: Obtiene la lista de todos los alumnos
 *     responses:
 *       200:
 *         description: Lista de alumnos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Alumno'
 */
router.get('/', alumnosCtrl.getAlumnos);

/**
 * @swagger
 * /api/alumnos:
 *   post:
 *     summary: Crea un nuevo alumno
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AlumnoSinId'
 *     responses:
 *       201:
 *         description: Alumno creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alumno'
 */

router.post('/', alumnosCtrl.createAlumnos);

/**
 * @swagger
 * /api/alumnos/{alumnoId}:
 *   get:
 *     summary: Obtiene un alumno por su ID
 *     parameters:
 *       - name: alumnoId
 *         in: path
 *         required: true
 *         description: ID del alumno a buscar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos del alumno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alumno'
 *       404:
 *         description: Alumno no encontrado
 */
router.get('/:idAlumno', alumnosCtrl.getAlumnoById);

/**
 * @swagger
 * /api/alumnos/{alumnoId}:
 *   put:
 *     summary: Actualiza los datos de un alumno por su ID
 *     parameters:
 *       - name: alumnoId
 *         in: path
 *         required: true
 *         description: ID del alumno a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AlumnoSinId'
 *     responses:
 *       200:
 *         description: Alumno actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alumno'
 *       404:
 *         description: Alumno no encontrado
 */
router.put('/:idAlumno', alumnosCtrl.updateAlumnosById);

/**
 * @swagger
 * /api/alumnos/{alumnoId}:
 *   delete:
 *     summary: Elimina un alumno por su ID
 *     parameters:
 *       - name: alumnoId
 *         in: path
 *         required: true
 *         description: ID del alumno a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Alumno eliminado exitosamente
 *       404:
 *         description: Alumno no encontrado
 */
router["delete"]('/:idAlumno', alumnosCtrl.deleteAlumnosById);
module.exports = router;