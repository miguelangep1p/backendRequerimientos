import app from './app'
import express from "express";
import morgan from "morgan";
import path from "path";  // Añade esta línea para importar el módulo 'path'

import paymentRoutes from "./routes/payment.routes.js";

import{PORT} from './config.js'

app.use(morgan("dev"));
app.use(paymentRoutes);
app.use(express.static(path.resolve("./src/public")));
app.listen(PORT)
console.log('listening on port',PORT)