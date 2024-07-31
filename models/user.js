const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  telefono: {
    type: String,
    required: false
  },
  cesfam: {
    type: String,
    required: false
  },
  region: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Region',
    required: true
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: true
  },
  consultations: [{ // Añade esta línea para incluir las consultas
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consultation'
  }]
});

module.exports = mongoose.model('User', userSchema);
