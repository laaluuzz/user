const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Region = require('../models/region');
const City = require('../models/city');

// Obtener todos los usuarios
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().populate('region').populate('city').populate('consultations');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear un nuevo usuario
router.post('/users', async (req, res) => {
    try {
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

// Obtener un usuario por ID
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('region').populate('city').populate('consultations');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar un usuario
router.put('/users/:id', async (req, res) => {
    try {
        const region = await Region.findById(req.body.region);
        const city = await City.findById(req.body.city);

        if (!region) {
            return res.status(400).json({ message: 'Region not found' });
        }

        if (!city) {
            return res.status(400).json({ message: 'City not found' });
        }

        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('region').populate('city').populate('consultations');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar un usuario
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
