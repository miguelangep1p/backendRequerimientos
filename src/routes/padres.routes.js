import {Router}from 'express'

const router = Router()
import *as padresCtrl from '../controllers/padres.controller'

router.get('/padres', padresCtrl.getPadres); 
router.get('/padres/:id', padresCtrl.getPadreById); 
router.post('/padres', padresCtrl.createPadre); 
router.put('/padres/:id', padresCtrl.updatePadre); 
router.delete('/padres/:id', padresCtrl.deletePadre); 

export default router;
