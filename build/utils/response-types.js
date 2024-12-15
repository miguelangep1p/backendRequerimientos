"use strict";

// responseUtils.js

var badRequest = function badRequest(res, message) {
  return res.status(400).json({
    message: message,
    data: null,
    status: 400
  });
};
var success = function success(res, data) {
  var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Success";
  return res.status(200).json({
    message: message,
    data: data,
    status: 200
  });
};
var error = function error(res, message) {
  var status = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
  return res.status(status).json({
    message: message,
    data: null,
    status: status
  });
};
module.exports = {
  badRequest: badRequest,
  success: success,
  error: error
};