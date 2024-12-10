import {Router}from 'express'

const router = Router()
import *as notificacionesCtrl from '../controllers/notificaciones.controller'

router.get('/notificaciones', notificacionesCtrl.getNotificaciones); 
router.get('/notificaciones/:id', notificacionesCtrl.getNotificacionById); 
router.post('/notificaciones', notificacionesCtrl.createNotificacion);
router.put('/notificaciones/:id', notificacionesCtrl.updateNotificacion); 
router.delete('/notificaciones/:id', notificacionesCtrl.deleteNotificacion); 

export default router;