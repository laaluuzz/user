const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoute = require('./routes/user');  // Asegúrate de que la ruta sea correcta
const regionRoute = require('./routes/region');
const cityRoute = require('./routes/city');

const cors = require('cors');

// Configuración del servidor
const app = express();
const port = process.env.PORT || 9000;

// Middleware
app.use(express.json());
app.use(cors());

// Rutas
app.use('/api', userRoute);   // Asegúrate de que '/api' sea el prefijo correcto
app.use('/api', regionRoute);
app.use('/api', cityRoute);

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Iniciar el servidor
app.listen(port, () => console.log(`Server listening on port ${port}`));
