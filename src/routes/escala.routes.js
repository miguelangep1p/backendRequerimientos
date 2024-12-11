import {Router}from 'express'

const router = Router()
import *as escalaCtrl from '../controllers/escala.controller'

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
router.get('/escala', escalaCtrl.getEscalas); 

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
router.get('/escala/:id', escalaCtrl.getEscalaById); 

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
router.post('/escala', escalaCtrl.createEscala); 

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
router.put('/escala/:id', escalaCtrl.updateEscala); 

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
router.delete('/escala/:id', escalaCtrl.deleteEscala); 

export default router;