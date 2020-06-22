const { Schema, model } = require('mongoose');

const Calls = new Schema({
  className: String,
  time: String
});

module.exports = model('Calls', Calls);
