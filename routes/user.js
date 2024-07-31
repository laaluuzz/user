const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Region = require('../models/region'); // Asegúrate de que estos modelos existan
const City = require('../models/city');

// Crear un nuevo usuario
router.post('/users', async (req, res) => {
    try {
        // Verifica que la región y ciudad existen
        const region = await Region.findById(req.body.region);
        const city = await City.findById(req.body.city);

        if (!region) {
            return res.status(400).json({ message: 'Region not found' });
        }

        if (!city) {
            return res.status(400).json({ message: 'City not found' });
        }

        const user = new User({
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            telefono: req.body.telefono,
            cesfam: req.body.cesfam,
            region: req.body.region,
            city: req.body.city,
            consultations: [] // Inicialmente vacío
        });

        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
