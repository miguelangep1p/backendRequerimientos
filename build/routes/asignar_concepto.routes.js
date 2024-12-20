"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _express = require("express");
var asignarconceptoCtrl = _interopRequireWildcard(require("../controllers/asignar_concepto.controller"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var router = (0, _express.Router)();
/**
 * @swagger
 * components:
 *   schemas:
 *     AsignarConcepto:
 *       type: object
 *       properties:
 *         idAsignar_Concepto:
 *           type: integer
 *           example: 1
 *         idEscala:
 *           type: integer
 *           example: 2
 *         idConcepto:
 *           type: integer
 *           example: 3
 */

/**
 * @swagger
 * /api/asignar_concepto:
 *   get:
 *     summary: Obtiene la lista de todas las asignaciones de conceptos
 *     responses:
 *       200:
 *         description: Lista de asignaciones de conceptos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AsignarConcepto'
 */
router.get('/', asignarconceptoCtrl.getAsignarConceptos);

/**
 * @swagger
 * /api/asignar_concepto/{id}:
 *   get:
 *     summary: Obtiene una asignación de concepto por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la asignación de concepto a buscar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos de la asignación de concepto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AsignarConcepto'
 *       404:
 *         description: Asignación de concepto no encontrada
 */
router.get('/:idAsignar_Concepto', asignarconceptoCtrl.getAsignarConceptoById);

/**
 * @swagger
 * /api/asignar_concepto:
 *   post:
 *     summary: Crea una nueva asignación de concepto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idEscala:
 *                 type: integer
 *                 example: 2
 *               idConcepto:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Asignación de concepto creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AsignarConcepto'
 */
router.post('/', asignarconceptoCtrl.createAsignarConcepto);

/**
 * @swagger
 * /api/asignar_concepto/{id}:
 *   put:
 *     summary: Actualiza una asignación de concepto por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la asignación de concepto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AsignarConcepto'
 *     responses:
 *       200:
 *         description: Asignación de concepto actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AsignarConcepto'
 *       404:
 *         description: Asignación de concepto no encontrada
 */
router.put('/:idAsignar_Concepto', asignarconceptoCtrl.updateAsignarConcepto);

/**
 * @swagger
 * /api/asignar_concepto/{id}:
 *   delete:
 *     summary: Elimina una asignación de concepto por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la asignación de concepto a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Asignación de concepto eliminada exitosamente
 *       404:
 *         description: Asignación de concepto no encontrada
 */
router["delete"]('/:idAsignar_Concepto', asignarconceptoCtrl.deleteAsignarConcepto);
module.exports = router;