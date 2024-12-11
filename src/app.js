const express = require("express");
const dotenv = require("dotenv");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const { createDefaultData } = require("./utils/data-default");

// Cargar variables de entorno
dotenv.config();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Configurar CORS
const corsOptions = {
  origin: ['*'], // Permitir todos los orígenes
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Permitir cookies y credenciales
  allowedHeaders: ['Content-Type', 'Authorization'], // Permitir estos encabezados
};
app.use(cors(corsOptions));

// Configuración de la base de datos
const sequelize = require('./database');

// Associations
const { User } = require("./models/user.model");
const { Role } = require("./models/role.model");

User.belongsTo(Role, { foreignKey: 'roleId', as: 'roles' });
Role.hasMany(User, { foreignKey: 'roleId', as: 'usuarios' });

// Verificar conexión a la base de datos
sequelize
  .authenticate()
  .then(() => console.log("Conectado a la base de datos MYSQL"))
  .catch((err) => console.error("No se pudo conectar a la base de datos", err));

sequelize
  .sync(
    { 
      // force: true 
    }
  )
  .then(() => console.log("Modelos sincronizados con la base de datos"))
  .catch((err) => console.error("Error al sincronizar los modelos", err))
  .finally(() => {
    // createDefaultData()
  })

// Configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API de TKMT3",
      version: "1.0.0",
      description: "API de uso sospechoso",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Redirigir la ruta principal a /api-docs
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

// Rutas
const { AuthRoutes } = require("./routes/auth.routes");
const { RoleRoutes } = require('./routes/role.routes');

app.use("/api/auth", AuthRoutes);
app.use('/api/roles', RoleRoutes);


module.exports = app;