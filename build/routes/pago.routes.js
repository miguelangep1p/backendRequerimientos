"use strict";

var _express = require("express");
var pagoCtrl = _interopRequireWildcard(require("../controllers/pago.controller"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const router = (0, _express.Router)();
/**
 * @swagger
 * components:
 *   schemas:
 *     Pago:
 *       type: object
 *       description: Representa un pago realizado en el sistema.
 *       properties:
 *         idPago:
 *           type: integer
 *           example: 1
 *           description: ID único del pago (generado automáticamente).
 *         idPadre:
 *           type: integer
 *           example: 123
 *           description: ID del padre asociado al pago.
 *         idAlumno:
 *           type: integer
 *           example: 456
 *           description: ID del alumno asociado al pago.
 *         idDeuda:
 *           type: integer
 *           example: 789
 *           description: ID de la deuda asociada.
 *         fechaPago:
 *           type: string
 *           format: date
 *           example: 2023-12-10
 *           description: Fecha en la que se realizó el pago.
 *         estadoPago:
 *           type: string
 *           example: Completado
 *           description: Estado del pago (por ejemplo, "Pendiente" o "Completado").
 *     PagoSinId:
 *       type: object
 *       description: Datos necesarios para crear o actualizar un pago.
 *       properties:
 *         idPadre:
 *           type: integer
 *           example: 123
 *           description: ID del padre asociado al pago.
 *         idAlumno:
 *           type: integer
 *           example: 456
 *           description: ID del alumno asociado al pago.
 *         idDeuda:
 *           type: integer
 *           example: 789
 *           description: ID de la deuda asociada.
 *         fechaPago:
 *           type: string
 *           format: date
 *           example: 2023-12-10
 *           description: Fecha en la que se realizó el pago.
 *         estadoPago:
 *           type: string
 *           example: Pendiente
 *           description: Estado del pago (por ejemplo, "Pendiente" o "Completado").
 */

/**
 * @swagger
 * /api/pago:
 *   get:
 *     summary: Obtiene la lista de todos los pagos
 *     responses:
 *       200:
 *         description: Lista de pagos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pago'
 */

router.get('/', pagoCtrl.getPagos);

/**
 * @swagger
 * /api/pago/{id}:
 *   get:
 *     summary: Obtiene un pago por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del pago a buscar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos del pago
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pago'
 *       404:
 *         description: Pago no encontrado
 */
router.get('/:idPago', pagoCtrl.getPagoById);

/**
 * @swagger
 * /api/pago:
 *   post:
 *     summary: Crea un nuevo pago
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PagoSinId'
 *     responses:
 *       201:
 *         description: Pago creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pago'
 */
router.post('/', pagoCtrl.createPago);

/**
 * @swagger
 * /api/pago/{id}:
 *   put:
 *     summary: Actualiza un pago por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del pago a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PagoSinId'
 *     responses:
 *       200:
 *         description: Pago actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pago'
 *       404:
 *         description: Pago no encontrado
 */
router.put('/:idPago', pagoCtrl.updatePago);

/**
 * @swagger
 * /api/pago/{id}:
 *   delete:
 *     summary: Elimina un pago por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del pago a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pago eliminado exitosamente
 *       404:
 *         description: Pago no encontrado
 */
router.delete('/:idPago', pagoCtrl.deletePago);

/**
 * @swagger
 * /api/pago/pagar-deuda:
 *   post:
 *     summary: Pagar una deuda y registrar el pago
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idDeuda:
 *                 type: integer
 *                 example: 123
 *                 description: ID de la deuda a pagar
 *               fecha:
 *                 type: string
 *                 format: date
 *                 example: 2024-12-21
 *                 description: Fecha en que se realiza el pago
 *     responses:
 *       200:
 *         description: Deuda pagada exitosamente
 *       400:
 *         description: Faltan datos obligatorios
 *       500:
 *         description: Error al pagar la deuda
 */
router.post('/pagar-deuda', pagoCtrl.pagarDeuda);
module.exports = router;