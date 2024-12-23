"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOrder = exports.captureOrder = exports.cancelPayment = void 0;
var _axios = _interopRequireDefault(require("axios"));
var _config = require("../config.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createOrder = async (req, res) => {
  try {
    const order = {
      intent: "CAPTURE",
      purchase_units: [{
        amount: {
          currency_code: "USD",
          value: "105.70"
        }
      }],
      application_context: {
        brand_name: "Santa Maria",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `http://localhost:3000/capture-order`,
        cancel_url: `http://localhost:3000/cancel-payment`
      }
    };

    // format the body
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    // Generate an access token
    const {
      data: {
        access_token
      }
    } = await _axios.default.post("https://api-m.sandbox.paypal.com/v1/oauth2/token", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      auth: {
        username: _config.PAYPAL_CLIENT,
        password: _config.PAYPAL_SECRET
      }
    });
    console.log(access_token);

    // make a request
    const response = await _axios.default.post(`${_config.PAYPAL_API_KEY}/v2/checkout/orders`, order, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    console.log(response.data);
    return res.json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something goes wrong");
  }
};
exports.createOrder = createOrder;
const captureOrder = async (req, res) => {
  const {
    token
  } = req.query;
  try {
    const response = await _axios.default.post(`${_config.PAYPAL_API_KEY}/v2/checkout/orders/${token}/capture`, {}, {
      auth: {
        username: _config.PAYPAL_CLIENT,
        password: _config.PAYPAL_SECRET
      }
    });
    console.log(response.data);
    res.redirect("/payed.html");
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal Server error"
    });
  }
};
exports.captureOrder = captureOrder;
const cancelPayment = (req, res) => res.redirect("/");
exports.cancelPayment = cancelPayment;