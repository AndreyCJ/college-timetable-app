const { Schema, model } = require('mongoose');

const ClassesTimetable = new Schema({
  className: {
    type: String,
    required: true
  },
  teacher: {
    type: String,
    required: true
  },
  classNum: {
    type: Number,
    required: true
  },
  classTime: String,
  room: String,
  day: {
    type: String,
    required: true
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Группы'
  },
  week: {
    type: String, 
    required: true
  }
});

module.exports = model('Расписание занятий', ClassesTimetable);
