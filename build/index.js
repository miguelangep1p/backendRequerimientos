"use strict";

var _app = _interopRequireDefault(require("./app"));
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _path = _interopRequireDefault(require("path"));
var _paymentRoutes = _interopRequireDefault(require("./routes/payment.routes.js"));
var _config = require("./config.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Añade esta línea para importar el módulo 'path'

_app.default.use((0, _morgan.default)("dev"));
_app.default.use(_paymentRoutes.default);
_app.default.use(_express.default.static(_path.default.resolve("./src/public")));
_app.default.listen(_config.PORT);
console.log('listening on port', _config.PORT);