
import {Router}from 'express'

const router = Router()
import *as historial_cambiosCtrl from '../controllers/historial_cambios.controller'

router.get('/', historial_cambiosCtrl.getHistorialCambios); 
router.get('/:idCambio', historial_cambiosCtrl.getHistorialCambioById); 
router.post('/', historial_cambiosCtrl.createHistorialCambio);
router.put('/:idCambio', historial_cambiosCtrl.updateHistorialCambio); 
router.delete('/:idCambio', historial_cambiosCtrl.deleteHistorialCambio); 

module.exports = router;
