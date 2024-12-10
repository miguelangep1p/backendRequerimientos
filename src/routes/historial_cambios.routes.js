
import {Router}from 'express'

const router = Router()
import *as historial_cambiosCtrl from '../controllers/historial_cambios.controller'

router.get('/historial_cambios', historial_cambiosCtrl.getHistorialCambios); 
router.get('/historial_cambios/:id', historial_cambiosCtrl.getHistorialCambioById); 
router.post('/historial_cambios', historial_cambiosCtrl.createHistorialCambio);
router.put('/historial_cambios/:id', historial_cambiosCtrl.updateHistorialCambio); 
router.delete('/historial_cambios/:id', historial_cambiosCtrl.deleteHistorialCambio); 

export default router;