const express = require('express');
const router = express.Router();
const Trip = require('../models/trip');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secreto_super_seguro';

// Middleware de autenticación
function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token requerido' });
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token requerido' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

// Crear un viaje (protegido)
router.post('/trips', auth, async (req, res) => {
  try {
    const { nombre, fechaIda, fechaVuelta } = req.body;
    console.log('[POST /trips] Datos recibidos:', req.body);
    if (!nombre || !fechaIda || !fechaVuelta) {
      console.log('[POST /trips] Faltan campos obligatorios');
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }
    const user = await User.findById(req.userId);
    if (!user) {
      console.log(`[POST /trips] Usuario no encontrado: ${req.userId}`);
      return res.status(404).json({ message: 'No se encontró el usuario. Inicia sesión de nuevo.' });
    }
    // Generar el itinerario automáticamente
    const start = new Date(fechaIda);
    const end = new Date(fechaVuelta);
    const itinerario = [];
    let current = new Date(start);
    let dia = 1;
    while (current <= end) {
      itinerario.push({
        dia,
        fecha: new Date(current),
        actividades: ''
      });
      current.setDate(current.getDate() + 1);
      dia++;
    }
    const trip = new Trip({ nombre, fechaIda, fechaVuelta, user: req.userId, itinerario });
    await trip.save();
    console.log('[POST /trips] Viaje creado:', trip);
    res.status(201).json({ message: 'Viaje creado correctamente.', trip });
  } catch (error) {
    console.error('[POST /trips] Error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Listar los viajes de un usuario (protegido)
router.get('/trips', auth, async (req, res) => {
  try {
    console.log('[GET /trips] userId autenticado:', req.userId);
    const user = await User.findById(req.userId);
    if (!user) {
      console.log(`[GET /trips] Usuario no encontrado: ${req.userId}`);
      return res.status(404).json({ message: 'No se encontró el usuario. Inicia sesión de nuevo.' });
    }
    const trips = await Trip.find({ user: req.userId });
    console.log(`[GET /trips] Viajes encontrados para usuario ${req.userId}:`, trips.length);
    res.status(200).json(trips);
  } catch (error) {
    console.error('[GET /trips] Error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Obtener un viaje por su ID (protegido)
router.get('/trips/:id', auth, async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.userId });
    if (!trip) {
      return res.status(404).json({ message: 'Viaje no encontrado.' });
    }
    res.status(200).json(trip);
  } catch (error) {
    console.error('[GET /trips/:id] Error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Editar información de un día del itinerario (protegido)
router.put('/trips/:id/itinerario/:dia', auth, async (req, res) => {
  try {
    const { actividades } = req.body;
    const trip = await Trip.findOne({ _id: req.params.id, user: req.userId });
    if (!trip) {
      return res.status(404).json({ message: 'Viaje no encontrado.' });
    }
    const diaIndex = trip.itinerario.findIndex(d => d.dia === parseInt(req.params.dia));
    if (diaIndex === -1) {
      return res.status(404).json({ message: 'Día no encontrado en el itinerario.' });
    }
    trip.itinerario[diaIndex].actividades = actividades;
    await trip.save();
    res.status(200).json({ message: 'Itinerario actualizado.', itinerario: trip.itinerario });
  } catch (error) {
    console.error('[PUT /trips/:id/itinerario/:dia] Error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 