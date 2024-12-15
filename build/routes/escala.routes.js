"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _express = require("express");
var escalaCtrl = _interopRequireWildcard(require("../controllers/escala.controller"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var router = (0, _express.Router)();
/**
 * @swagger
 * components:
 *   schemas:
 *     Escala:
 *       type: object
 *       description: Representa una escala de pago en el sistema.
 *       properties:
 *         idEscala:
 *           type: integer
 *           example: 1
 *           description: ID único de la escala (generado automáticamente).
 *         escala:
 *           type: string
 *           example: Escala A
 *           description: Nombre de la escala.
 *         descripcion:
 *           type: string
 *           example: Escala de pago para estudiantes de primaria
 *           description: Descripción de la escala.
 *         monto:
 *           type: number
 *           format: float
 *           example: 1500.50
 *           description: Monto asociado a la escala.
 *     EscalaSinId:
 *       type: object
 *       description: Datos necesarios para crear o actualizar una escala.
 *       properties:
 *         escala:
 *           type: string
 *           example: Escala A
 *           description: Nombre de la escala.
 *         descripcion:
 *           type: string
 *           example: Escala de pago para estudiantes de primaria
 *           description: Descripción de la escala.
 *         monto:
 *           type: number
 *           format: float
 *           example: 1500.50
 *           description: Monto asociado a la escala.
 */

/**
 * @swagger
 * /api/escala:
 *   get:
 *     summary: Obtiene la lista de todas las escalas
 *     responses:
 *       200:
 *         description: Lista de escalas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Escala'
 */
router.get('/', escalaCtrl.getEscalas);

/**
 * @swagger
 * /api/escala/{id}:
 *   get:
 *     summary: Obtiene una escala por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la escala a buscar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos de la escala
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Escala'
 *       404:
 *         description: Escala no encontrada
 */
router.get('/:idEscala', escalaCtrl.getEscalaById);

/**
 * @swagger
 * /api/escala:
 *   post:
 *     summary: Crea una nueva escala
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EscalaSinId'
 *     responses:
 *       201:
 *         description: Escala creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Escala'
 */
router.post('/', escalaCtrl.createEscala);

/**
 * @swagger
 * /api/escala/{id}:
 *   put:
 *     summary: Actualiza una escala por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la escala a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EscalaSinId'
 *     responses:
 *       200:
 *         description: Escala actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Escala'
 *       404:
 *         description: Escala no encontrada
 */
router.put('/:idEscala', escalaCtrl.updateEscala);

/**
 * @swagger
 * /api/escala/{id}:
 *   delete:
 *     summary: Elimina una escala por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la escala a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Escala eliminada exitosamente
 *       404:
 *         description: Escala no encontrada
 */
router["delete"]('/:idEscala', escalaCtrl.deleteEscala);
module.exports = router;