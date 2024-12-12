import {Router}from 'express'

const router = Router()
import *as padresCtrl from '../controllers/padres.controller'

/**
 * @swagger
 * components:
 *   schemas:
 *     Padre:
 *       type: object
 *       description: Representa un padre o tutor en el sistema.
 *       properties:
 *         idPadre:
 *           type: integer
 *           example: 1
 *           description: ID único del padre o tutor (generado automáticamente).
 *         primerNombre:
 *           type: string
 *           example: Juan
 *           description: Primer nombre del padre o tutor.
 *         ApellidoPaterno:
 *           type: string
 *           example: Pérez
 *           description: Apellido paterno del padre o tutor.
 *         ApellidoMaterno:
 *           type: string
 *           example: García
 *           description: Apellido materno del padre o tutor.
 *         direccion:
 *           type: string
 *           example: Av. Siempre Viva 742
 *           description: Dirección del padre o tutor.
 *         telefono:
 *           type: string
 *           example: "987654321"
 *           description: Teléfono de contacto del padre o tutor.
 *         email:
 *           type: string
 *           format: email
 *           example: padre@example.com
 *           description: Correo electrónico del padre o tutor.
 *         dni:
 *           type: string
 *           example: "12345678"
 *           description: Documento de identidad del padre o tutor.
 *         idAlumno:
 *           type: integer
 *           example: 123
 *           description: ID del alumno asociado.
 *         ubicacion:
 *           type: string
 *           example: Lima, Perú
 *           description: Ubicación del padre o tutor.
 *     PadreSinId:
 *       type: object
 *       description: Datos necesarios para crear o actualizar un padre o tutor.
 *       properties:
 *         primerNombre:
 *           type: string
 *           example: Juan
 *           description: Primer nombre del padre o tutor.
 *         ApellidoPaterno:
 *           type: string
 *           example: Pérez
 *           description: Apellido paterno del padre o tutor.
 *         ApellidoMaterno:
 *           type: string
 *           example: García
 *           description: Apellido materno del padre o tutor.
 *         direccion:
 *           type: string
 *           example: Av. Siempre Viva 742
 *           description: Dirección del padre o tutor.
 *         telefono:
 *           type: string
 *           example: "987654321"
 *           description: Teléfono de contacto del padre o tutor.
 *         email:
 *           type: string
 *           format: email
 *           example: padre@example.com
 *           description: Correo electrónico del padre o tutor.
 *         dni:
 *           type: string
 *           example: "12345678"
 *           description: Documento de identidad del padre o tutor.
 *         idAlumno:
 *           type: integer
 *           example: 123
 *           description: ID del alumno asociado.
 *         ubicacion:
 *           type: string
 *           example: Lima, Perú
 *           description: Ubicación del padre o tutor.
 */

/**
 * @swagger
 * /api/padres:
 *   get:
 *     summary: Obtiene la lista de todos los padres o tutores
 *     responses:
 *       200:
 *         description: Lista de padres o tutores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Padre'
 */

router.get('/', padresCtrl.getPadres); 

/**
 * @swagger
 * /api/padres/{id}:
 *   get:
 *     summary: Obtiene un padre o tutor por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del padre o tutor a buscar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos del padre o tutor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Padre'
 *       404:
 *         description: Padre o tutor no encontrado
 */
router.get('/:idPadre', padresCtrl.getPadreById); 

/**
 * @swagger
 * /api/padres:
 *   post:
 *     summary: Crea un nuevo padre o tutor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PadreSinId'
 *     responses:
 *       201:
 *         description: Padre o tutor creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Padre'
 */
router.post('/', padresCtrl.createPadre); 


/**
 * @swagger
 * /api/padres/{id}:
 *   put:
 *     summary: Actualiza un padre o tutor por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del padre o tutor a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PadreSinId'
 *     responses:
 *       200:
 *         description: Padre o tutor actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Padre'
 *       404:
 *         description: Padre o tutor no encontrado
 */
router.put('/:idPadre', padresCtrl.updatePadre); 

/**
 * @swagger
 * /api/padres/{id}:
 *   delete:
 *     summary: Elimina un padre o tutor por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del padre o tutor a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Padre o tutor eliminado exitosamente
 *       404:
 *         description: Padre o tutor no encontrado
 */
router.delete('/:idPadre', padresCtrl.deletePadre); 

module.exports = router;
