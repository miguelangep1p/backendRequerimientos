import {Router}from 'express'

const router = Router()
import *as detalle_pagoCtrl from '../controllers/detalle_pago.controller'

router.get('/detalle_pago', detalle_pagoCtrl.getDetallePagos); 
router.get('/detalle_pago/:id', detalle_pagoCtrl.getDetallePagoById); 
router.post('/detalle_pago', detalle_pagoCtrl.createDetallePago); 
router.put('/detalle_pago/:id', detalle_pagoCtrl.updateDetallePago); 
router.delete('/detalle_pago/:id', detalle_pagoCtrl.deleteDetallePago); 

export default router;