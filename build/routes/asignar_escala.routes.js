"use strict";

var _express = require("express");
var asignar_escalaCtrl = _interopRequireWildcard(require("../controllers/asignar_escala.controller"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const router = (0, _express.Router)();
/**
 * @swagger
 * components:
 *   schemas:
 *     AsignarEscala:
 *       type: object
 *       description: Representa la relación entre un alumno y una escala asignada.
 *       properties:
 *         idAsignarEscala:
 *           type: integer
 *           example: 1
 *           description: ID único de la asignación de escala (generado automáticamente).
 *         idAlumno:
 *           type: integer
 *           example: 123
 *           description: ID del alumno asociado.
 *         idEscala:
 *           type: integer
 *           example: 456
 *           description: ID de la escala asignada.
 *         fechaAsignacion:
 *           type: string
 *           format: date
 *           example: 2023-12-10
 *           description: Fecha en la que se asignó la escala al alumno.
 *     AsignarEscalaSinId:
 *       type: object
 *       description: Representa los datos necesarios para crear o actualizar una asignación de escala.
 *       properties:
 *         idAlumno:
 *           type: integer
 *           example: 123
 *           description: ID del alumno asociado.
 *         idEscala:
 *           type: integer
 *           example: 456
 *           description: ID de la escala asignada.
 *         fechaAsignacion:
 *           type: string
 *           format: date
 *           example: 2023-12-10
 *           description: Fecha en la que se asignó la escala al alumno.
 */

/**
 * @swagger
 * /api/asignar_escala:
 *   get:
 *     summary: Obtiene todas las asignaciones de escalas
 *     responses:
 *       200:
 *         description: Lista de asignaciones de escalas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AsignarEscala'
 */

router.get('/', asignar_escalaCtrl.getAsignarEscalas);

/**
 * @swagger
 * /api/asignar_escala/{id}:
 *   get:
 *     summary: Obtiene una asignación de escala por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la asignación de escala a buscar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos de la asignación de escala
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AsignarEscala'
 *       404:
 *         description: Asignación de escala no encontrada
 */

router.get('/:idAsignarEscala', asignar_escalaCtrl.getAsignarEscalaById);

/**
 * @swagger
 * /api/asignar_escala:
 *   post:
 *     summary: Crea una nueva asignación de escala
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AsignarEscalaSinId'
 *     responses:
 *       201:
 *         description: Asignación de escala creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AsignarEscala'
 */
router.post('/', asignar_escalaCtrl.createAsignarEscala);

/**
 * @swagger
 * /api/asignar_escala/{id}:
 *   put:
 *     summary: Actualiza una asignación de escala por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la asignación de escala a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AsignarEscalaSinId'
 *     responses:
 *       200:
 *         description: Asignación de escala actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AsignarEscala'
 *       404:
 *         description: Asignación de escala no encontrada
 */
router.put('/:idAsignarEscala', asignar_escalaCtrl.updateAsignarEscala);

/**
 * @swagger
 * /api/asignar_escala/{id}:
 *   delete:
 *     summary: Elimina una asignación de escala por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la asignación de escala a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Asignación de escala eliminada exitosamente
 *       404:
 *         description: Asignación de escala no encontrada
 */
router.delete('/:idAsignarEscala', asignar_escalaCtrl.deleteAsignarEscala);
module.exports = router;