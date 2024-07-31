const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Consultation = require('../models/consultation'); // Importa el modelo de consulta

// Get all users with consultations
router.get('/users', async (req, res) => {
  try {
    const users = await User.find()
      .populate('region')
      .populate('city')
      .populate({
        path: 'consultations',  // Asegúrate de que el campo 'consultations' existe en el modelo de User
        populate: { path: 'user' } // Opcional, si necesitas datos de usuario en las consultas
      });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a user by ID with consultations
router.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
      .populate('region')
      .populate('city')
      .populate({
        path: 'consultations',  // Asegúrate de que el campo 'consultations' existe en el modelo de User
        populate: { path: 'user' } // Opcional, si necesitas datos de usuario en las consultas
      });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Other routes for create, update, delete

module.exports = router;
