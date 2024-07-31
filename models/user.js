const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
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
    ref: 'Region', // Asumiendo que tienes un modelo de Región
    required: true
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City', // Asumiendo que tienes un modelo de Ciudad
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
