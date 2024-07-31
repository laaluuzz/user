const express = require("express");
const User = require("../models/user");
const Region = require("../models/region"); // Asegúrate de que esto también está actualizado
const City = require("../models/city");

const router = express.Router();

// Create user
router.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Get all users
router.get("/users", (req, res) => {
  User
    .find()
    .populate('region')  // Popula la región
    .populate('city')    // Popula la ciudad
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Get a user
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  User
    .findById(id)
    .populate('region')  // Popula la región
    .populate('city')    // Popula la ciudad
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Delete a user
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  User
    .deleteOne({ _id: id })
    .then((data) => {
      if (data.deletedCount === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

// Update a user
router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, email, region, city } = req.body;
  User
    .updateOne({ _id: id }, { $set: { name, age, email, region, city } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
