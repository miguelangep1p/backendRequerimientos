"use strict";

// Middleware: Check Roles
function authorizeRole(roles) {
  return function (req, res, next) {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Permiso denegado"
      });
    }
    next();
  };
}

// Ejemplo de Uso
app.get('/api/admin', authenticateToken, authorizeRole(['admin']), function (req, res) {
  res.send("Acceso permitido solo para administradores.");
});