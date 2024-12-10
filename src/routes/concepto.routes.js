import {Router}from 'express'

const router = Router()
import *as conceptoCtrl from '../controllers/concepto.controller'

router.get('/concepto', conceptoCtrl.getConceptos); 
router.get('/concepto/:id', conceptoCtrl.getConceptoById); 
router.post('/concepto', conceptoCtrl.createConcepto); 
router.put('/concepto/:id', conceptoCtrl.updateConcepto); 
router.delete('/concepto/:id', conceptoCtrl.deleteConcepto); 

export default router;
