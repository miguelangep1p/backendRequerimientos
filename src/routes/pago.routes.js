import {Router}from 'express'

const router = Router()
import *as pagoCtrl from '../controllers/pago.controller'

router.get('/pago', pagoCtrl.getPagos); 
router.get('/pago/:id', pagoCtrl.getPagoById); 
router.post('/pago', pagoCtrl.createPago); 
router.put('/pago/:id', pagoCtrl.updatePago); 
router.delete('/pago/:id', pagoCtrl.deletePago); 

export default router;