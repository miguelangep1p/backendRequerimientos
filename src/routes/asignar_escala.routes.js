import {Router}from 'express'

const router = Router()
import *as asignar_escalaCtrl from '../controllers/asignar_escala.controller'

router.get('/asignar_escala', asignar_escalaCtrl.getAsignarEscalas); 
router.get('/asignar_escala/:id', asignar_escalaCtrl.getAsignarEscalaById);
router.post('/asignar_escala', asignar_escalaCtrl.createAsignarEscala); 
router.put('/asignar_escala/:id', asignar_escalaCtrl.updateAsignarEscala); 
router.delete('/asignar_escala/:id', asignar_escalaCtrl.deleteAsignarEscala); 

export default router;