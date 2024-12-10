const express = require("express");
const dotenv = require("dotenv");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const { createDefaultData } = require("./utils/data-default");
const AuthRoutes = require('./routes/auth.routes'); // Import directly

// Cargar variables de entorno
dotenv.config();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Configurar CORS
const corsOptions = {
  origin: ["*"], // Permitir todos los orígenes
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Permitir cookies y credenciales
  allowedHeaders: ["Content-Type", "Authorization"], // Permitir estos encabezados
};
app.use(cors(corsOptions));

// Configuración de la base de datos para MySQL
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: "mysql",
});

// Associations
const { User } = require("./models/User.js");
const { Role } = require("./models/Role.js");

User.belongsTo(Role, { foreignKey: "roleId", as: "roles" });
Role.hasMany(User, { foreignKey: "roleId", as: "usuarios" });

// Verificar conexión a la base de datos
sequelize
  .authenticate()
  .then(() => console.log("Conectado a la base de datos MySQL"))
  .catch((err) => console.error("No se pudo conectar a la base de datos", err));

sequelize
  .sync(
    {
      // force: true // Descomenta esta línea para reiniciar las tablas (borrando datos existentes)
    }
  )
  .then(() => console.log("Modelos sincronizados con la base de datos"))
  .catch((err) => console.error("Error al sincronizar los modelos", err))
  .finally(() => {
    // createDefaultData();
  });

// Configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API de TKMT3",
      version: "1.0.0",
      description: "API de uso sospechoso",
    },
    servers: [{ url: process.env.URL_API }], // Make sure this environment variable is set
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
const { RoleRoutes } = require("./routes/role.routes");
const { indexRoutes } = require("./routes/index.routes");
const { alumnosRoutes } = require("./routes/alumnos.routes");

app.use("/api/auth", AuthRoutes);
app.use("/api/roles", RoleRoutes);
app.use("/api/index", indexRoutes);
app.use("/api/alumnos", alumnosRoutes);
app.use((req, res, next) => {
  res.status(404).json({
    message: "endpoint not found",
  });
});

// Exportar la aplicación
module.exports = app;
