// models/consultation.js
const mongoose = require("mongoose");

const consultationSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencia al modelo de usuario
    required: true
  }
});

module.exports = mongoose.model('Consultation', consultationSchema);
