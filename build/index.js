"use strict";

var _app = _interopRequireDefault(require("./app"));
var _config = require("./config.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_app["default"].listen(_config.PORT);
console.log('listening on port', _config.PORT);