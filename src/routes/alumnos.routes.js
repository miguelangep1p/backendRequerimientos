import {Router}from 'express'

const router = Router()


import *as alumnosCtrl from '../controllers/alumnos.controller'

router.get('/', alumnosCtrl.getAlumnos)
router.get('/', alumnosCtrl.getAlumnos)
router.post('/', alumnosCtrl.createAlumnos)
router.get('/:alumnoId', alumnosCtrl.getAlumnosById)
router.put('/:alumnoId', alumnosCtrl.updateAlumnosById)
router.delete('/:alumnoId', alumnosCtrl.deleteAlumnosById)




export default router;