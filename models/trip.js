const mongoose = require('mongoose');

const itinerarioSchema = new mongoose.Schema({
  dia: Number,
  fecha: Date,
  actividades: { type: String, default: '' }
}, { _id: false });

const tripSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  fechaIda: {
    type: Date,
    required: true
  },
  fechaVuelta: {
    type: Date,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  itinerario: [itinerarioSchema]
});

module.exports = mongoose.model('Trip', tripSchema); 