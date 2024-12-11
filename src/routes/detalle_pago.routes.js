import {Router}from 'express'

const router = Router()
import *as detalle_pagoCtrl from '../controllers/detalle_pago.controller'


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



router.get('/detalle_pago', detalle_pagoCtrl.getDetallePagos); 

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

router.get('/detalle_pago/:id', detalle_pagoCtrl.getDetallePagoById); 


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
router.post('/detalle_pago', detalle_pagoCtrl.createDetallePago); 

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
router.put('/detalle_pago/:id', detalle_pagoCtrl.updateDetallePago); 

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
router.delete('/detalle_pago/:id', detalle_pagoCtrl.deleteDetallePago); 

export default router;