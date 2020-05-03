const { Schema, model } = require('mongoose');

const ClassesTimetable = new Schema({
  className: String,
  classNum: Number,
  classTime: String,
  room: String,
  group: String,
  day: String,
  week: String,
});

module.exports = model('ClassesTimetable', ClassesTimetable);
