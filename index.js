const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoute = require('./routes/user');
const cors = require('cors');

// Configuración del servidor
const app = express();
const port = process.env.PORT || 9000;

// Configuración de CORS para desarrollo y producción
const allowedOrigins = [
  'http://localhost:9000', // desarrollo local
  'https://user-opyf.onrender.com/'  // producción, reemplaza por tu dominio real
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware
app.use(express.json());

// Rutas
app.use('/api', userRoute);

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Iniciar el servidor
app.listen(port, () => console.log(`Server listening on port ${port}`));
