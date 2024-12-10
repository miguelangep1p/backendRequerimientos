import {Router}from 'express'

const router = Router()
import *as reciboCtrl from '../controllers/recibo.controller'

router.get('/recibo', reciboCtrl.getRecibos); 
router.get('/recibo/:id', reciboCtrl.getReciboById); 
router.post('/recibo', reciboCtrl.createRecibo); 
router.put('/recibo/:id', reciboCtrl.updateRecibo); 
router.delete('/recibo/:id', reciboCtrl.deleteRecibo); 

export default router;
