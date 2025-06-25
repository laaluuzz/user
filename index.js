const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoute = require('./routes/user');
const tripRoute = require('./routes/trip');
const cors = require('cors');

// Configuración del servidor
const app = express();
const port = process.env.PORT || 9000;

// Middleware
app.use(express.json());
app.use(cors());

// Rutas
app.use('/api', userRoute);
app.use('/api', tripRoute);

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Iniciar el servidor
app.listen(port, () => console.log(`Server listening on port ${port}`));
