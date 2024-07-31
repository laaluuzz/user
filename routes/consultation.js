// routes/consultations.js
const express = require("express");
const Consultation = require("../models/consultation");
const User = require("../models/user");

const router = express.Router();

// Create a consultation
router.post("/consultations", (req, res) => {
  const consultation = new Consultation(req.body);
  consultation
    .save()
    .then(async (data) => {
      // Add consultation to the user
      await User.findByIdAndUpdate(
        consultation.user,
        { $push: { consultations: data._id } }
      );
      res.json(data);
    })
    .catch((error) => res.json({ message: error }));
});

// Get all consultations for a user
router.get("/users/:userId/consultations", (req, res) => {
  const { userId } = req.params;
  Consultation
    .find({ user: userId })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Get a consultation
router.get("/consultations/:id", (req, res) => {
  const { id } = req.params;
  Consultation
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Update a consultation
router.put("/consultations/:id", (req, res) => {
  const { id } = req.params;
  const { date, reason, details } = req.body;
  Consultation
    .updateOne({ _id: id }, { $set: { date, reason, details } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Delete a consultation
router.delete("/consultations/:id", (req, res) => {
  const { id } = req.params;
  Consultation
    .deleteOne({ _id: id })
    .then(async (data) => {
      if (data.deletedCount === 0) {
        return res.status(404).json({ message: 'Consultation not found' });
      }
      // Remove consultation reference from user
      await User.updateOne(
        { consultations: id },
        { $pull: { consultations: id } }
      );
      res.json({ message: 'Consultation deleted successfully' });
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;
