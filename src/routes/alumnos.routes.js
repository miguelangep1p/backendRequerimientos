import {Router}from 'express'

const router = Router()
import *as alumnosCtrl from '../controllers/alumnos.controller'

/**
 * @swagger
 * components:
 *   schemas:
 *     Alumno:
 *       type: object
 *       description: Esquema completo de un alumno, incluyendo el ID generado automáticamente.
 *       properties:
 *         idAlumno:
 *           type: integer
 *           example: 1
 *           description: Identificador único del alumno.
 *         primerNombre:
 *           type: string
 *           example: Juan
 *           description: Primer nombre del alumno.
 *         otrosNombres:
 *           type: string
 *           example: Carlos
 *           description: Otros nombres del alumno (opcional).
 *         ApellidoPaterno:
 *           type: string
 *           example: Pérez
 *           description: Apellido paterno del alumno.
 *         ApellidoMaterno:
 *           type: string
 *           example: García
 *           description: Apellido materno del alumno.
 *         anio:
 *           type: integer
 *           example: 2023
 *           description: Año de estudio del alumno.
 *         seccion:
 *           type: string
 *           example: A
 *           description: Sección del alumno.
 *         periodo:
 *           type: string
 *           example: "2023-2024"
 *           description: Periodo académico del alumno.
 *         estado:
 *           type: string
 *           example: Activo
 *           description: Estado actual del alumno.
 *         imagen_perfil:
 *           type: string
 *           format: uri
 *           example: https://example.com/perfiles/1.jpg
 *           description: URL de la imagen de perfil del alumno.
 * 
 *     AlumnoSinId:
 *       type: object
 *       description: Esquema de un alumno sin el campo de ID, usado para solicitudes de creación o actualización.
 *       properties:
 *         primerNombre:
 *           type: string
 *           example: Juan
 *           description: Primer nombre del alumno.
 *         otrosNombres:
 *           type: string
 *           example: Carlos
 *           description: Otros nombres del alumno (opcional).
 *         ApellidoPaterno:
 *           type: string
 *           example: Pérez
 *           description: Apellido paterno del alumno.
 *         ApellidoMaterno:
 *           type: string
 *           example: García
 *           description: Apellido materno del alumno.
 *         anio:
 *           type: integer
 *           example: 2023
 *           description: Año de estudio del alumno.
 *         seccion:
 *           type: string
 *           example: A
 *           description: Sección del alumno.
 *         periodo:
 *           type: string
 *           example: "2023-2024"
 *           description: Periodo académico del alumno.
 *         estado:
 *           type: string
 *           example: Activo
 *           description: Estado actual del alumno.
 *         imagen_perfil:
 *           type: string
 *           format: uri
 *           example: https://example.com/perfiles/1.jpg
 *           description: URL de la imagen de perfil del alumno.
 */


/**
 * @swagger
 * /api/alumnos:
 *   get:
 *     summary: Obtiene la lista de todos los alumnos
 *     responses:
 *       200:
 *         description: Lista de alumnos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Alumno'
 */
    router.get('/', alumnosCtrl.getAlumnos)

/**
 * @swagger
 * /api/alumnos:
 *   post:
 *     summary: Crea un nuevo alumno
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AlumnoSinId'
 *     responses:
 *       201:
 *         description: Alumno creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alumno'
 */

    router.post('/', alumnosCtrl.createAlumnos)

/**
 * @swagger
 * /api/alumnos/{alumnoId}:
 *   get:
 *     summary: Obtiene un alumno por su ID
 *     parameters:
 *       - name: alumnoId
 *         in: path
 *         required: true
 *         description: ID del alumno a buscar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos del alumno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alumno'
 *       404:
 *         description: Alumno no encontrado
 */
    router.get('/:alumnoId', alumnosCtrl.getAlumnosById)

/**
 * @swagger
 * /api/alumnos/{alumnoId}:
 *   put:
 *     summary: Actualiza los datos de un alumno por su ID
 *     parameters:
 *       - name: alumnoId
 *         in: path
 *         required: true
 *         description: ID del alumno a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AlumnoSinId'
 *     responses:
 *       200:
 *         description: Alumno actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alumno'
 *       404:
 *         description: Alumno no encontrado
 */
    router.put('/:alumnoId', alumnosCtrl.updateAlumnosById)

/**
 * @swagger
 * /api/alumnos/{alumnoId}:
 *   delete:
 *     summary: Elimina un alumno por su ID
 *     parameters:
 *       - name: alumnoId
 *         in: path
 *         required: true
 *         description: ID del alumno a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Alumno eliminado exitosamente
 *       404:
 *         description: Alumno no encontrado
 */
    router.delete('/:alumnoId', alumnosCtrl.deleteAlumnosById)

export default router;