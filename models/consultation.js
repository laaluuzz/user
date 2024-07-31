const mongoose = require('mongoose');

const consultationSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
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
    required: true
  }
});

module.exports = mongoose.model('Consultation', consultationSchema);
