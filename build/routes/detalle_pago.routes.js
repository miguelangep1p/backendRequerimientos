"use strict";

var _express = require("express");
var detalle_pagoCtrl = _interopRequireWildcard(require("../controllers/detalle_pago.controller"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const router = (0, _express.Router)();
/**
 * @swagger
 * components:
 *   schemas:
 *     DetallePago:
 *       type: object
 *       description: Representa un detalle de pago en el sistema.
 *       properties:
 *         idDetalle_Pago:
 *           type: integer
 *           example: 1
 *           description: ID único del detalle de pago (generado automáticamente).
 *         idPago:
 *           type: integer
 *           example: 123
 *           description: ID del pago asociado.
 *         idDeuda:
 *           type: integer
 *           example: 456
 *           description: ID de la deuda asociada.
 *         descripcion:
 *           type: string
 *           example: Pago parcial realizado
 *           description: Descripción del detalle de pago.
 *     DetallePagoSinId:
 *       type: object
 *       description: Datos necesarios para crear o actualizar un detalle de pago.
 *       properties:
 *         idPago:
 *           type: integer
 *           example: 123
 *           description: ID del pago asociado.
 *         idDeuda:
 *           type: integer
 *           example: 456
 *           description: ID de la deuda asociada.
 *         descripcion:
 *           type: string
 *           example: Pago parcial realizado
 *           description: Descripción del detalle de pago.
 */

/**
 * @swagger
 * /api/detalle_pago:
 *   get:
 *     summary: Obtiene la lista de todos los detalles de pago
 *     responses:
 *       200:
 *         description: Lista de detalles de pago
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DetallePago'
 */

router.get('/', detalle_pagoCtrl.getDetallePagos);

/**
 * @swagger
 * /api/detalle_pago/{id}:
 *   get:
 *     summary: Obtiene un detalle de pago por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del detalle de pago a buscar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos del detalle de pago
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DetallePago'
 *       404:
 *         description: Detalle de pago no encontrado
 */

router.get('/:idDetalle_Pago', detalle_pagoCtrl.getDetallePagoById);

/**
 * @swagger
 * /api/detalle_pago:
 *   post:
 *     summary: Crea un nuevo detalle de pago
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DetallePagoSinId'
 *     responses:
 *       201:
 *         description: Detalle de pago creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DetallePago'
 */
router.post('/', detalle_pagoCtrl.createDetallePago);

/**
 * @swagger
 * /api/detalle_pago/{id}:
 *   put:
 *     summary: Actualiza un detalle de pago por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del detalle de pago a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DetallePagoSinId'
 *     responses:
 *       200:
 *         description: Detalle de pago actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DetallePago'
 *       404:
 *         description: Detalle de pago no encontrado
 */
router.put('/:idDetalle_Pago', detalle_pagoCtrl.updateDetallePago);

/**
 * @swagger
 * /api/detalle_pago/{id}:
 *   delete:
 *     summary: Elimina un detalle de pago por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del detalle de pago a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle de pago eliminado exitosamente
 *       404:
 *         description: Detalle de pago no encontrado
 */
router.delete('/:idDetalle_Pago', detalle_pagoCtrl.deleteDetallePago);
module.exports = router;