"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _express = require("express");
var condonacionCtrl = _interopRequireWildcard(require("../controllers/condonacion.controller"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var router = (0, _express.Router)();
/**
 * @swagger
 * components:
 *   schemas:
 *     Condonacion:
 *       type: object
 *       description: Representa una condonación en el sistema.
 *       properties:
 *         idCondonacion:
 *           type: integer
 *           example: 1
 *           description: ID único de la condonación (generado automáticamente).
 *         idDeuda:
 *           type: integer
 *           example: 123
 *           description: ID de la deuda asociada.
 *         fecha:
 *           type: string
 *           format: date
 *           example: 2023-12-10
 *           description: Fecha en que se realizó la condonación.
 *     CondonacionSinId:
 *       type: object
 *       description: Datos necesarios para crear o actualizar una condonación.
 *       properties:
 *         idDeuda:
 *           type: integer
 *           example: 123
 *           description: ID de la deuda asociada.
 *         fecha:
 *           type: string
 *           format: date
 *           example: 2023-12-10
 *           description: Fecha en que se realizó la condonación.
 */

/**
 * @swagger
 * /api/condonaciones:
 *   get:
 *     summary: Obtiene la lista de todas las condonaciones
 *     responses:
 *       200:
 *         description: Lista de condonaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Condonacion'
 */

router.get('/', condonacionCtrl.getCondonaciones);

/**
 * @swagger
 * /api/condonaciones/{id}:
 *   get:
 *     summary: Obtiene una condonación por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la condonación a buscar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos de la condonación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Condonacion'
 *       404:
 *         description: Condonación no encontrada
 */
router.get('/:idCondonacion', condonacionCtrl.getCondonacionById);

/**
 * @swagger
 * /api/condonaciones:
 *   post:
 *     summary: Crea una nueva condonación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CondonacionSinId'
 *     responses:
 *       201:
 *         description: Condonación creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Condonacion'
 */
router.post('/', condonacionCtrl.createCondonacion);

/**
 * @swagger
 * /api/condonaciones/{id}:
 *   put:
 *     summary: Actualiza una condonación por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la condonación a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CondonacionSinId'
 *     responses:
 *       200:
 *         description: Condonación actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Condonacion'
 *       404:
 *         description: Condonación no encontrada
 */
router.put('/:idCondonacion', condonacionCtrl.updateCondonacion);

/**
 * @swagger
 * /api/condonaciones/{id}:
 *   delete:
 *     summary: Elimina una condonación por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la condonación a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Condonación eliminada exitosamente
 *       404:
 *         description: Condonación no encontrada
 */

router["delete"]('/:idCondonacion', condonacionCtrl.deleteCondonacion);
module.exports = router;