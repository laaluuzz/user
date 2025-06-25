const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secreto_super_seguro';

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { login, email, password } = req.body;
    if (!login || !email || !password) {
      return res.status(400).json({ message: 'Login, email y contraseña son obligatorios.' });
    }
    const existingUser = await User.findOne({ $or: [{ email }, { login }] });
    if (existingUser) {
      return res.status(400).json({ message: 'El login o el email ya están registrados.' });
    }
    const user = new User({ login, email, password });
    await user.save();
    res.status(201).json({ message: 'Usuario registrado correctamente.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login de usuario (por login o email)
router.post('/login', async (req, res) => {
  try {
    const { loginOrEmail, password } = req.body;
    if (!loginOrEmail || !password) {
      return res.status(400).json({ message: 'Login/email y contraseña son obligatorios.' });
    }
    const user = await User.findOne({ $or: [{ email: loginOrEmail }, { login: loginOrEmail }] });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Credenciales incorrectas.' });
    }
    // Generar token JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '2h' });
    res.status(200).json({ message: 'Login exitoso.', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener todos los usuarios
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // No mostrar la contraseña
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 