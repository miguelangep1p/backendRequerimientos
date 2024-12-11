import {Router}from 'express'

const router = Router()
import *as conceptoCtrl from '../controllers/concepto.controller'


/**
 * @swagger
 * components:
 *   schemas:
 *     Concepto:
 *       type: object
 *       description: Representa un concepto en el sistema.
 *       properties:
 *         idConcepto:
 *           type: integer
 *           example: 1
 *           description: ID único del concepto (generado automáticamente).
 *         concepto:
 *           type: string
 *           example: Matrícula
 *           description: Nombre del concepto.
 *         descripcion:
 *           type: string
 *           example: Pago de matrícula anual
 *           description: Descripción del concepto.
 *     ConceptoSinId:
 *       type: object
 *       description: Datos necesarios para crear o actualizar un concepto.
 *       properties:
 *         concepto:
 *           type: string
 *           example: Matrícula
 *           description: Nombre del concepto.
 *         descripcion:
 *           type: string
 *           example: Pago de matrícula anual
 *           description: Descripción del concepto.
 */

/**
 * @swagger
 * /api/concepto:
 *   get:
 *     summary: Obtiene la lista de todos los conceptos
 *     responses:
 *       200:
 *         description: Lista de conceptos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Concepto'
 */

router.get('/concepto', conceptoCtrl.getConceptos); 
/**
 * @swagger
 * /api/concepto/{id}:
 *   get:
 *     summary: Obtiene un concepto por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del concepto a buscar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos del concepto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Concepto'
 *       404:
 *         description: Concepto no encontrado
 */

router.get('/concepto/:id', conceptoCtrl.getConceptoById); 


/**
 * @swagger
 * /api/concepto:
 *   post:
 *     summary: Crea un nuevo concepto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConceptoSinId'
 *     responses:
 *       201:
 *         description: Concepto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Concepto'
 */
router.post('/concepto', conceptoCtrl.createConcepto); 

/**
 * @swagger
 * /api/concepto/{id}:
 *   put:
 *     summary: Actualiza un concepto por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del concepto a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConceptoSinId'
 *     responses:
 *       200:
 *         description: Concepto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Concepto'
 *       404:
 *         description: Concepto no encontrado
 */

router.put('/concepto/:id', conceptoCtrl.updateConcepto); 

/**
 * @swagger
 * /api/concepto/{id}:
 *   delete:
 *     summary: Elimina un concepto por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del concepto a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Concepto eliminado exitosamente
 *       404:
 *         description: Concepto no encontrado
 */
router.delete('/concepto/:id', conceptoCtrl.deleteConcepto); 

export default router;
