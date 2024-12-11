import {Router}from 'express'

const router = Router()
import *as reciboCtrl from '../controllers/recibo.controller'


/**
 * @swagger
 * components:
 *   schemas:
 *     Recibo:
 *       type: object
 *       description: Representa un recibo emitido en el sistema.
 *       properties:
 *         idRecibo:
 *           type: integer
 *           example: 1
 *           description: ID único del recibo (generado automáticamente).
 *         idAlumno:
 *           type: integer
 *           example: 123
 *           description: ID del alumno asociado al recibo.
 *         idDeuda:
 *           type: integer
 *           example: 456
 *           description: ID de la deuda asociada al recibo.
 *         formaPago:
 *           type: string
 *           example: Tarjeta de crédito
 *           description: Forma de pago utilizada.
 *         nOperacion:
 *           type: string
 *           example: 987654321
 *           description: Número de operación del pago.
 *         fechaEmision:
 *           type: string
 *           format: date
 *           example: 2023-12-10
 *           description: Fecha en que se emitió el recibo.
 *         importe:
 *           type: number
 *           format: float
 *           example: 1500.50
 *           description: Importe total del recibo.
 *     ReciboSinId:
 *       type: object
 *       description: Datos necesarios para crear o actualizar un recibo.
 *       properties:
 *         idAlumno:
 *           type: integer
 *           example: 123
 *           description: ID del alumno asociado al recibo.
 *         idDeuda:
 *           type: integer
 *           example: 456
 *           description: ID de la deuda asociada al recibo.
 *         formaPago:
 *           type: string
 *           example: Transferencia bancaria
 *           description: Forma de pago utilizada.
 *         nOperacion:
 *           type: string
 *           example: 123456789
 *           description: Número de operación del pago.
 *         fechaEmision:
 *           type: string
 *           format: date
 *           example: 2023-12-10
 *           description: Fecha en que se emitió el recibo.
 *         importe:
 *           type: number
 *           format: float
 *           example: 1200.75
 *           description: Importe total del recibo.
 */


/**
 * @swagger
 * /api/recibo:
 *   get:
 *     summary: Obtiene la lista de todos los recibos
 *     responses:
 *       200:
 *         description: Lista de recibos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recibo'
 */

router.get('/recibo', reciboCtrl.getRecibos); 

/**
 * @swagger
 * /api/recibo/{id}:
 *   get:
 *     summary: Obtiene un recibo por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del recibo a buscar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos del recibo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recibo'
 *       404:
 *         description: Recibo no encontrado
 */

router.get('/recibo/:id', reciboCtrl.getReciboById); 

/**
 * @swagger
 * /api/recibo:
 *   post:
 *     summary: Crea un nuevo recibo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReciboSinId'
 *     responses:
 *       201:
 *         description: Recibo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recibo'
 */
router.post('/recibo', reciboCtrl.createRecibo); 


/**
 * @swagger
 * /api/recibo/{id}:
 *   put:
 *     summary: Actualiza un recibo por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del recibo a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReciboSinId'
 *     responses:
 *       200:
 *         description: Recibo actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recibo'
 *       404:
 *         description: Recibo no encontrado
 */
router.put('/recibo/:id', reciboCtrl.updateRecibo); 

/**
 * @swagger
 * /api/recibo/{id}:
 *   delete:
 *     summary: Elimina un recibo por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del recibo a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Recibo eliminado exitosamente
 *       404:
 *         description: Recibo no encontrado
 */
router.delete('/recibo/:id', reciboCtrl.deleteRecibo); 

export default router;
