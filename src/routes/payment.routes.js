import { Router } from "express";
import {
    createOrder,
    captureOrder,
    cancelPayment,
  } from "../controllers/payment.controller.js";
  
// import *as paymentCtrl from '../controllers/payment.controller.js'
const router = Router();
router.post("/create-order", createOrder);

router.get("/capture-order", captureOrder);

router.get("/cancel-order", cancelPayment);
// router.post("/", paymentCtrl.createOrder);
// /**
//  * @swagger
//  * /:
//  *   post:
//  *     summary: Create a new order
//  *     description: Endpoint to create a new order.
//  *     responses:
//  *       201:
//  *         description: Order created successfully.
//  *       400:
//  *         description: Error creating the order.
//  */


// router.get("/", paymentCtrl.captureOrder);
// /**
//  * @swagger
//  * /capture:
//  *   get:
//  *     summary: Capture an order
//  *     description: Endpoint to capture an existing order.
//  *     responses:
//  *       200:
//  *         description: Order captured successfully.
//  *       404:
//  *         description: Order not found.
//  */


// router.get("/", paymentCtrl.cancelPayment);
// /**
//  * @swagger
//  * /cancel:
//  *   get:
//  *     summary: Cancel a payment
//  *     description: Endpoint to cancel a payment.
//  *     responses:
//  *       200:
//  *         description: Payment cancelled successfully.
//  *       404:
//  *         description: Payment not found.
//  */

module.exports = router;
