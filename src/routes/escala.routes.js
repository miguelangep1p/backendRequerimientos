import {Router}from 'express'

const router = Router()
import *as escalaCtrl from '../controllers/escala.controller'

router.get('/escala', escalaCtrl.getEscalas); 
router.get('/escala/:id', escalaCtrl.getEscalaById); 
router.post('/escala', escalaCtrl.createEscala); 
router.put('/escala/:id', escalaCtrl.updateEscala); 
router.delete('/escala/:id', escalaCtrl.deleteEscala); 

export default router;