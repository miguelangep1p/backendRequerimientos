"use strict";

var express = require("express");
var dotenv = require("dotenv");
var swaggerJsDoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");
var cors = require("cors");
var _require = require("./utils/data-default"),
  createDefaultData = _require.createDefaultData;

// Cargar variables de entorno
dotenv.config();
var app = express();

// Middleware para parsear JSON
app.use(express.json());

// Configurar CORS
var corsOptions = {
  origin: ['*'],
  // Permitir todos los orígenes
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  // Permitir cookies y credenciales
  allowedHeaders: ['Content-Type', 'Authorization'] // Permitir estos encabezados
};
app.use(cors(corsOptions));

// Configuración de la base de datos
var sequelize = require('./database');

// Associations
var _require2 = require("./models/user.model"),
  User = _require2.User;
var _require3 = require("./models/role.model"),
  Role = _require3.Role;
User.belongsTo(Role, {
  foreignKey: 'roleId',
  as: 'roles'
});
Role.hasMany(User, {
  foreignKey: 'roleId',
  as: 'usuarios'
});

// Verificar conexión a la base de datos
sequelize.authenticate().then(function () {
  return console.log("Conectado a la base de datos MYSQL");
})["catch"](function (err) {
  return console.error("No se pudo conectar a la base de datos", err);
});
sequelize.sync({
  // force: true 
}).then(function () {
  return console.log("Modelos sincronizados con la base de datos");
})["catch"](function (err) {
  return console.error("Error al sincronizar los modelos", err);
})["finally"](function () {
  // createDefaultData()
});

// Configuración de Swagger
var swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API de TKMT3",
      version: "1.0.0",
      description: "API de uso sospechoso"
    },
    servers: [{
      url: "http://localhost:3000"
    }]
  },
  apis: ["./src/routes/*.js"]
};
var swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Redirigir la ruta principal a /api-docs
app.get("/", function (req, res) {
  res.redirect("/api-docs");
});

// Rutas
var _require4 = require("./routes/auth.routes"),
  AuthRoutes = _require4.AuthRoutes;
var _require5 = require('./routes/role.routes'),
  RoleRoutes = _require5.RoleRoutes;
var AlumnosRoutes = require('./routes/alumnos.routes');
var AsignarConceptoRoutes = require('./routes/asignar_concepto.routes');
var AsignarEscalaRoutes = require('./routes/asignar_escala.routes');
var ConceptoRoutes = require('./routes/concepto.routes');
var CondonacionRoutes = require('./routes/condonacion.routes');
var DetallePagoRoutes = require('./routes/detalle_pago.routes');
var DeudaRoutes = require('./routes/deuda.routes');
var EscalaRoutes = require('./routes/escala.routes');
var HistorialCambiosRoutes = require('./routes/historial_cambios.routes');
var IndexRoutes = require('./routes/index.routes');
var NotificacionesRoutes = require('./routes/notificaciones.routes');
var PadresRoutes = require('./routes/padres.routes');
var PagoRoutes = require('./routes/pago.routes');
var ReciboRoutes = require('./routes/recibo.routes');
var UserRoutes = require('./routes/user.routes');
app.use("/api/auth", AuthRoutes);
app.use('/api/roles', RoleRoutes);
app.use('/api/alumnos', AlumnosRoutes);
app.use('/api/asignar_concepto', AsignarConceptoRoutes);
app.use('/api/asignar_escala', AsignarEscalaRoutes);
app.use('/api/concepto', ConceptoRoutes);
app.use('/api/condonaciones', CondonacionRoutes);
app.use('/api/detalle_pago', DetallePagoRoutes);
app.use('/api/deuda', DeudaRoutes);
app.use('/api/escala', EscalaRoutes);
app.use('/api/historial_cambios', HistorialCambiosRoutes);
app.use('/', IndexRoutes);
app.use('/api/notificaciones', NotificacionesRoutes);
app.use('/api/padres', PadresRoutes);
app.use('/api/pago', PagoRoutes);
app.use('/api/recibo', ReciboRoutes);
app.use('/api/users', UserRoutes);
app._router.stack.forEach(function (r) {
  if (r.route && r.route.path) {
    console.log(r.route.path);
  }
});
module.exports = app;