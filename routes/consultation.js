const express = require('express');
const router = express.Router();
const Consultation = require('../models/consultation');
const User = require('../models/user');

router.post('/users/:userId/consultations', async (req, res) => {
  try {
    const { userId } = req.params;
    const { date, reason, details } = req.body;

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

    // Agregar la consulta al array de consultas del usuario
    user.consultations.push(consultation._id);
    await user.save();

    res.status(201).json(consultation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
