"use strict";

var _express = require("express");
var notificacionesCtrl = _interopRequireWildcard(require("../controllers/notificaciones.controller"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const router = (0, _express.Router)();
/**
  * @swagger
 * components:
 *   schemas:
 *     Notificacion:
 *       type: object
 *       description: Representa una notificación en el sistema.
 *       properties:
 *         idNotificacion:
 *           type: integer
 *           example: 1
 *           description: ID único de la notificación (generado automáticamente).
 *         idAlumno:
 *           type: integer
 *           example: 123
 *           description: ID del alumno asociado a la notificación.
 *         idPadre:
 *           type: integer
 *           example: 456
 *           description: ID del padre asociado a la notificación.
 *         idDeuda:
 *           type: integer
 *           example: 789
 *           description: ID de la deuda asociada, si corresponde.
 *         tipo:
 *           type: string
 *           enum: [Deuda, General, Aviso]
 *           example: Deuda
 *           description: Tipo de la notificación.
 *         descripcion:
 *           type: string
 *           example: Notificación sobre una deuda pendiente.
 *           description: Descripción detallada de la notificación.
 *         fechaNotificacion:
 *           type: string
 *           format: date-time
 *           example: 2023-12-10T10:00:00Z
 *           description: Fecha y hora de la notificación.
 *         estado:
 *           type: boolean
 *           example: false
 *           description: Estado de la notificación, `true` para leída, `false` para no leída.
 *     NotificacionSinId:
 *       type: object
 *       description: Datos necesarios para crear o actualizar una notificación.
 *       properties:
 *         idAlumno:
 *           type: integer
 *           example: 123
 *           description: ID del alumno asociado a la notificación.
 *         idPadre:
 *           type: integer
 *           example: 456
 *           description: ID del padre asociado a la notificación.
 *         idDeuda:
 *           type: integer
 *           example: 789
 *           description: ID de la deuda asociada, si corresponde.
 *         tipo:
 *           type: string
 *           enum: [Deuda, General, Aviso]
 *           example: General
 *           description: Tipo de la notificación.
 *         descripcion:
 *           type: string
 *           example: Recordatorio general.
 *           description: Descripción detallada de la notificación.
 *         fechaNotificacion:
 *           type: string
 *           format: date-time
 *           example: 2023-12-10T10:00:00Z
 *           description: Fecha y hora de la notificación.
 *         estado:
 *           type: boolean
 *           example: false
 *           description: Estado de la notificación, `true` para leída, `false` para no leída.
 */

/**
 * @swagger
 * /api/notificaciones:
 *   get:
 *     summary: Obtiene la lista de todas las notificaciones
 *     responses:
 *       200:
 *         description: Lista de notificaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notificacion'
 */

router.get('/', notificacionesCtrl.getNotificaciones);

/**
 * @swagger
 * /api/notificaciones/{id}:
 *   get:
 *     summary: Obtiene una notificación por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la notificación a buscar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos de la notificación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notificacion'
 *       404:
 *         description: Notificación no encontrada
 */
router.get('/:idNotificacion', notificacionesCtrl.getNotificacionById);

/**
 * @swagger
 * /api/notificaciones:
 *   post:
 *     summary: Crea una nueva notificación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NotificacionSinId'
 *     responses:
 *       201:
 *         description: Notificación creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notificacion'
 */
router.post('/', notificacionesCtrl.createNotificacion);

/**
 * @swagger
 * /api/notificaciones/{id}:
 *   put:
 *     summary: Actualiza una notificación por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la notificación a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NotificacionSinId'
 *     responses:
 *       200:
 *         description: Notificación actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notificacion'
 *       404:
 *         description: Notificación no encontrada
 */

router.put('/:idNotificacion', notificacionesCtrl.updateNotificacion);

/**
 * @swagger
 * /api/notificaciones/{id}:
 *   delete:
 *     summary: Elimina una notificación por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la notificación a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Notificación eliminada exitosamente
 *       404:
 *         description: Notificación no encontrada
 */
router.delete('/:idNotificacion', notificacionesCtrl.deleteNotificacion);
module.exports = router;