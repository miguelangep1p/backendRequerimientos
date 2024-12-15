"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _express = require("express");
var deudaCtrl = _interopRequireWildcard(require("../controllers/deuda.controller"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var router = (0, _express.Router)();
/**
 * @swagger
 * components:
 *   schemas:
 *     Deuda:
 *       type: object
 *       description: Representa una deuda en el sistema.
 *       properties:
 *         idDeuda:
 *           type: integer
 *           example: 1
 *           description: ID único de la deuda (generado automáticamente).
 *         idAlumno:
 *           type: integer
 *           example: 123
 *           description: ID del alumno asociado a la deuda.
 *         idAsignarEscala:
 *           type: integer
 *           example: 456
 *           description: ID de la asignación de escala asociada.
 *         idAsignar_Concepto:
 *           type: integer
 *           example: 789
 *           description: ID de la asignación de concepto asociada.
 *         fecha:
 *           type: string
 *           format: date
 *           example: 2023-12-10
 *           description: Fecha límite para cancelar la deuda.
 *     DeudaSinId:
 *       type: object
 *       description: Datos necesarios para crear o actualizar una deuda.
 *       properties:
 *         idAlumno:
 *           type: integer
 *           example: 123
 *           description: ID del alumno asociado a la deuda.
 *         idAsignarEscala:
 *           type: integer
 *           example: 456
 *           description: ID de la asignación de escala asociada.
 *         idAsignar_Concepto:
 *           type: integer
 *           example: 789
 *           description: ID de la asignación de concepto asociada.
 *         fecha:
 *           type: string
 *           format: date
 *           example: 2023-12-10
 *           description: Fecha límite para cancelar la deuda.
 */

/**
 * @swagger
 * /api/deuda:
 *   get:
 *     summary: Obtiene la lista de todas las deudas
 *     responses:
 *       200:
 *         description: Lista de deudas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Deuda'
 */
router.get('/', deudaCtrl.getDeudas);

/**
 * @swagger
 * /api/deuda/{id}:
 *   get:
 *     summary: Obtiene una deuda por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la deuda a buscar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos de la deuda
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Deuda'
 *       404:
 *         description: Deuda no encontrada
 */
router.get('/:idDeuda', deudaCtrl.getDeudaById);

/**
 * @swagger
 * /api/deuda:
 *   post:
 *     summary: Crea una nueva deuda
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeudaSinId'
 *     responses:
 *       201:
 *         description: Deuda creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Deuda'
 */
router.post('/', deudaCtrl.createDeuda);

/**
 * @swagger
 * /api/deuda/{id}:
 *   put:
 *     summary: Actualiza una deuda por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la deuda a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeudaSinId'
 *     responses:
 *       200:
 *         description: Deuda actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Deuda'
 *       404:
 *         description: Deuda no encontrada
 */
router.put('/:idDeuda', deudaCtrl.updateDeuda);

/**
 * @swagger
 * /api/deuda/{id}:
 *   delete:
 *     summary: Elimina una deuda por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la deuda a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deuda eliminada exitosamente
 *       404:
 *         description: Deuda no encontrada
 */
router["delete"]('/:idDeuda', deudaCtrl.deleteDeuda);
module.exports = router;