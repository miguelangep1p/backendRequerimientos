// In src/routes/auth.routes.js
const router = express.Router();

router.get('/login', (req, res) => {
  res.send('Login route');
});

module.exports = router;  // Export the router

// In src/app.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const AuthRoutes = require('./routes/auth.routes');  // Import the route file

dotenv.config();

const app = express();

// Use the imported AuthRoutes
app.use('/api/auth', AuthRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
