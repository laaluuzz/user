const mongoose = require("mongoose");

const regionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Region', regionSchema);
