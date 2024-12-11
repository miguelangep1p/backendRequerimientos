import {Router}from 'express'

const router = Router()
import *as condonacionCtrl from '../controllers/condonacion.controller'

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

router.get('/condonaciones', condonacionCtrl.getCondonaciones); 

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
router.get('/condonaciones/:id', condonacionCtrl.getCondonacionById); 

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
router.post('/condonaciones', condonacionCtrl.createCondonacion);

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
router.put('/condonaciones/:id', condonacionCtrl.updateCondonacion); 

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

router.delete('/condonaciones/:id', condonacionCtrl.deleteCondonacion); 

export default router;
