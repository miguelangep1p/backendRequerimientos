import {Router}from 'express'

const router = Router()
import *as condonacionCtrl from '../controllers/condonacion.controller'

router.get('/condonaciones', condonacionCtrl.getCondonaciones); 
router.get('/condonaciones/:id', condonacionCtrl.getCondonacionById); 
router.post('/condonaciones', condonacionCtrl.createCondonacion);
router.put('/condonaciones/:id', condonacionCtrl.updateCondonacion); 
router.delete('/condonaciones/:id', condonacionCtrl.deleteCondonacion); 

export default router;
