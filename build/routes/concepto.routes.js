"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _express = require("express");
var conceptoCtrl = _interopRequireWildcard(require("../controllers/concepto.controller"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var router = (0, _express.Router)();
/**
 * @swagger
 * components:
 *   schemas:
 *     Concepto:
 *       type: object
 *       description: Representa un concepto en el sistema.
 *       properties:
 *         idConcepto:
 *           type: integer
 *           example: 1
 *           description: ID único del concepto (generado automáticamente).
 *         concepto:
 *           type: string
 *           example: Matrícula
 *           description: Nombre del concepto.
 *         descripcion:
 *           type: string
 *           example: Pago de matrícula anual
 *           description: Descripción del concepto.
 *     ConceptoSinId:
 *       type: object
 *       description: Datos necesarios para crear o actualizar un concepto.
 *       properties:
 *         concepto:
 *           type: string
 *           example: Matrícula
 *           description: Nombre del concepto.
 *         descripcion:
 *           type: string
 *           example: Pago de matrícula anual
 *           description: Descripción del concepto.
 */

/**
 * @swagger
 * /api/concepto:
 *   get:
 *     summary: Obtiene la lista de todos los conceptos
 *     responses:
 *       200:
 *         description: Lista de conceptos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Concepto'
 */

router.get('/', conceptoCtrl.getConceptos);
/**
 * @swagger
 * /api/concepto/{id}:
 *   get:
 *     summary: Obtiene un concepto por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del concepto a buscar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos del concepto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Concepto'
 *       404:
 *         description: Concepto no encontrado
 */

router.get('/:idConcepto', conceptoCtrl.getConceptoById);

/**
 * @swagger
 * /api/concepto:
 *   post:
 *     summary: Crea un nuevo concepto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConceptoSinId'
 *     responses:
 *       201:
 *         description: Concepto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Concepto'
 */
router.post('/', conceptoCtrl.createConcepto);

/**
 * @swagger
 * /api/concepto/{id}:
 *   put:
 *     summary: Actualiza un concepto por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del concepto a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConceptoSinId'
 *     responses:
 *       200:
 *         description: Concepto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Concepto'
 *       404:
 *         description: Concepto no encontrado
 */

router.put('/:idConcepto', conceptoCtrl.updateConcepto);

/**
 * @swagger
 * /api/concepto/{id}:
 *   delete:
 *     summary: Elimina un concepto por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del concepto a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Concepto eliminado exitosamente
 *       404:
 *         description: Concepto no encontrado
 */
router["delete"]('/:idConcepto', conceptoCtrl.deleteConcepto);
module.exports = router;