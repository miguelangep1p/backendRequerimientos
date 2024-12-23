import { Router } from "express";
import {
  createOrder,
  captureOrder,
  cancelPayment,
} from "../controllers/payment.controller.js";

const router = Router();

/**
 * @swagger
 * /api/payments/create-order:
 *   post:
 *     summary: Create a new order
 *     description: Endpoint to create a new order.
 *     responses:
 *       201:
 *         description: Order created successfully.
 *       400:
 *         description: Error creating the order.
 */
router.post("/create-order", createOrder);

/**
 * @swagger
 * /api/payments/capture-order:
 *   get:
 *     summary: Capture an order
 *     description: Endpoint to capture an existing order.
 *     responses:
 *       200:
 *         description: Order captured successfully.
 *       404:
 *         description: Order not found.
 */
router.get("/capture-order", captureOrder);

/**
 * @swagger
 * /api/payments/cancel-order:
 *   get:
 *     summary: Cancel a payment
 *     description: Endpoint to cancel a payment.
 *     responses:
 *       200:
 *         description: Payment cancelled successfully.
 *       404:
 *         description: Payment not found.
 */
router.get("/cancel-order", cancelPayment);

module.exports = router;
