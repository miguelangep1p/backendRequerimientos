import {Router}from 'express'

const router = Router()
import *as asignarconceptoCtrl from '../controllers/asignar_concepto.controller'

router.get('/asignar_concepto', asignarconceptoCtrl.getAsignarConceptos); 
router.get('/asignar_concepto/:id', asignarconceptoCtrl.getAsignarConceptoById); 
router.post('/asignar_concepto', asignarconceptoCtrl.createAsignarConcepto); 
router.put('/asignar_concepto/:id', asignarconceptoCtrl.updateAsignarConcepto); 
router.delete('/asignar_concepto/:id', asignarconceptoCtrl.deleteAsignarConcepto); 

export default router;