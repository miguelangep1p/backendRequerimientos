"use strict";

var _express = require("express");
var paymentCtrl = _interopRequireWildcard(require("../controllers/payment.controller.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const router = (0, _express.Router)();
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
router.post("/create-order", paymentCtrl.createOrder);

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
router.get("/capture-order", paymentCtrl.captureOrder);

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
router.get("/cancel-order", paymentCtrl.cancelPayment);
module.exports = router;