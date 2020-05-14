const { Schema, model } = require('mongoose');

const ClassesTimetable = new Schema({
  className: {
    type: String,
    required: true
  },
  classNum: {
    type: Number,
    required: true
  },
  classTime: String,
  room: String,
  group: [{
    type: Schema.Types.ObjectId,
    ref: 'Groups'
  }],
  day: {
    type: String,
    required: true
  },
  week: {
    type: String, 
    required: true
  }
});

module.exports = model('ClassesTimetable', ClassesTimetable);
