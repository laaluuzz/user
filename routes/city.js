const express = require("express");
const City = require("../models/city");

const router = express.Router();

// Create city
router.post("/cities", (req, res) => {
  const city = new City(req.body);
  city
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Get all cities
router.get("/cities", (req, res) => {
  City
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Get a city
router.get("/cities/:id", (req, res) => {
  const { id } = req.params;
  City
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Delete a city
router.delete("/cities/:id", (req, res) => {
  const { id } = req.params;
  City
    .deleteOne({ _id: id })
    .then((data) => {
      if (data.deletedCount === 0) {
        return res.status(404).json({ message: 'City not found' });
      }
      res.json({ message: 'City deleted successfully' });
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

// Update a city
router.put("/cities/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  City
    .updateOne({ _id: id }, { $set: { name } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
