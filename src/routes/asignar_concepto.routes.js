import {Router}from 'express'

const router = Router()
import *as asignarconceptoCtrl from '../controllers/asignar_concepto.controller'

/**
 * @swagger
 * components:
 *   schemas:
 *     AsignarConcepto:
 *       type: object
 *       properties:
 *         idAsignar_Concepto:
 *           type: integer
 *           example: 1
 *         idEscala:
 *           type: integer
 *           example: 2
 *         idConcepto:
 *           type: integer
 *           example: 3
 */


/**
 * @swagger
 * /api/asignar_concepto:
 *   get:
 *     summary: Obtiene la lista de todas las asignaciones de conceptos
 *     responses:
 *       200:
 *         description: Lista de asignaciones de conceptos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AsignarConcepto'
 */
    router.get('/asignar_concepto', asignarconceptoCtrl.getAsignarConceptos); 

/**
 * @swagger
 * /api/asignar_concepto/{id}:
 *   get:
 *     summary: Obtiene una asignación de concepto por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la asignación de concepto a buscar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos de la asignación de concepto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AsignarConcepto'
 *       404:
 *         description: Asignación de concepto no encontrada
 */
    router.get('/asignar_concepto/:id', asignarconceptoCtrl.getAsignarConceptoById); 

/**
 * @swagger
 * /api/asignar_concepto:
 *   post:
 *     summary: Crea una nueva asignación de concepto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idEscala:
 *                 type: integer
 *                 example: 2
 *               idConcepto:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Asignación de concepto creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AsignarConcepto'
 */
    router.post('/asignar_concepto', asignarconceptoCtrl.createAsignarConcepto); 

/**
 * @swagger
 * /api/asignar_concepto/{id}:
 *   put:
 *     summary: Actualiza una asignación de concepto por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la asignación de concepto a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *             properties:
 *               idEscala:
 *                 type: integer
 *                 example: 2
 *               idConcepto:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Asignación de concepto actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AsignarConcepto'
 *       404:
 *         description: Asignación de concepto no encontrada
 */
router.put('/asignar_concepto/:id', asignarconceptoCtrl.updateAsignarConcepto); 

/**
 * @swagger
 * /api/asignar_concepto/{id}:
 *   delete:
 *     summary: Elimina una asignación de concepto por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la asignación de concepto a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Asignación de concepto eliminada exitosamente
 *       404:
 *         description: Asignación de concepto no encontrada
 */
router.delete('/asignar_concepto/:id', asignarconceptoCtrl.deleteAsignarConcepto); 

export default router;