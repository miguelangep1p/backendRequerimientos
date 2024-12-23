"use strict";

const express = require("express");
const dotenv = require("dotenv");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const paypal = require("@paypal/checkout-server-sdk");
const {
  createDefaultData
} = require("./utils/data-default");

// Cargar variables de entorno
dotenv.config();
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Configurar CORS
const corsOptions = {
  origin: ['*'],
  // Permitir todos los orígenes
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  // Permitir cookies y credenciales
  allowedHeaders: ['Content-Type', 'Authorization'] // Permitir estos encabezados
};
app.use(cors(corsOptions));

// Configuración de la base de datos
const sequelize = require('./database');

// Associations
const {
  User
} = require("./models/user.model");
const {
  Role
} = require("./models/role.model");
User.belongsTo(Role, {
  foreignKey: 'roleId',
  as: 'roles'
});
Role.hasMany(User, {
  foreignKey: 'roleId',
  as: 'usuarios'
});

// Verificar conexión a la base de datos
sequelize.authenticate().then(() => console.log("Conectado a la base de datos MYSQL")).catch(err => console.error("No se pudo conectar a la base de datos", err));
sequelize.sync({
  // force: true 
}).then(() => console.log("Modelos sincronizados con la base de datos")).catch(err => console.error("Error al sincronizar los modelos", err)).finally(() => {
  // createDefaultData()
});

// Configuración de Swagger
const swaggerOptions = {
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
const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);

// Endpoint para crear una orden de PayPal
app.post("/api/paypal/create-order", async (req, res) => {
  const { amount, currency } = req.body;

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: currency || "USD",
          value: amount || "10.00", // Monto predeterminado
        },
      },
    ],
  });

  try {
    const order = await client.execute(request);
    res.status(200).json({ id: order.result.id });
  } catch (error) {
    console.error("Error al crear la orden:", error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para capturar una orden de PayPal
app.post("/api/paypal/capture-order", async (req, res) => {
  const { orderId } = req.body;

  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const capture = await client.execute(request);
    res.status(200).json({ capture: capture.result });
  } catch (error) {
    console.error("Error al capturar la orden:", error);
    res.status(500).json({ error: error.message });
  }
});
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Redirigir la ruta principal a /api-docs
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

// Rutas
const {
  AuthRoutes
} = require("./routes/auth.routes");
const {
  RoleRoutes
} = require('./routes/role.routes');
const AlumnosRoutes = require('./routes/alumnos.routes');
const AsignarConceptoRoutes = require('./routes/asignar_concepto.routes');
const AsignarEscalaRoutes = require('./routes/asignar_escala.routes');
const ConceptoRoutes = require('./routes/concepto.routes');
const CondonacionRoutes = require('./routes/condonacion.routes');
const DetallePagoRoutes = require('./routes/detalle_pago.routes');
const DeudaRoutes = require('./routes/deuda.routes');
const EscalaRoutes = require('./routes/escala.routes');
const HistorialCambiosRoutes = require('./routes/historial_cambios.routes');
const IndexRoutes = require('./routes/index.routes');
const NotificacionesRoutes = require('./routes/notificaciones.routes');
const PadresRoutes = require('./routes/padres.routes');
const PagoRoutes = require('./routes/pago.routes');
const ReciboRoutes = require('./routes/recibo.routes');
const UserRoutes = require('./routes/user.routes');
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
app._router.stack.forEach(r => {
  if (r.route && r.route.path) {
    console.log(r.route.path);
  }
});
module.exports = app;