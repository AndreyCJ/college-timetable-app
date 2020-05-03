const { Schema, model } = require('mongoose');

const Calls = new Schema({
  name: String,
  time: String
});

module.exports = model('Calls', Calls);
