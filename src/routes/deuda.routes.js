import {Router}from 'express'

const router = Router()
import *as deudaCtrl from '../controllers/deuda.controller'

router.get('/deuda', deudaCtrl.getDeudas); 
router.get('/deuda/:id', deudaCtrl.getDeudaById); 
router.post('/deuda', deudaCtrl.createDeuda); 
router.put('/deuda/:id', deudaCtrl.updateDeuda); 
router.delete('/deuda/:id', deudaCtrl.deleteDeuda); 

export default router;