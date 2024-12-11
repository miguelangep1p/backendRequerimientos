import {Router}from 'express'

const router = Router()
import *as notificacionesCtrl from '../controllers/notificaciones.controller'

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

router.get('/notificaciones', notificacionesCtrl.getNotificaciones); 

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
router.get('/notificaciones/:id', notificacionesCtrl.getNotificacionById); 

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
router.post('/notificaciones', notificacionesCtrl.createNotificacion);

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

router.put('/notificaciones/:id', notificacionesCtrl.updateNotificacion); 

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
router.delete('/notificaciones/:id', notificacionesCtrl.deleteNotificacion); 

export default router;