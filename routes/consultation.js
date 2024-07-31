const express = require('express');
const router = express.Router();
const Consultation = require('../models/consultation');
const User = require('../models/user');

// Agregar consulta a un paciente
router.post('/users/:userId/consultations', async (req, res) => {
  try {
    const { userId } = req.params;
    const { date, reason, details } = req.body;

    // Verificar si el usuario existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const consultation = new Consultation({
      user: userId,
      date,
      reason,
      details
    });

    await consultation.save();
    res.status(201).json(consultation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
