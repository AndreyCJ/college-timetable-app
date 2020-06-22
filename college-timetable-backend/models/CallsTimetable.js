const { Schema, model } = require('mongoose');

const CallsTimetableSchema = new Schema({
  shiftNum: String,
  CallsArr: [{
    type: Schema.Types.ObjectId,
    ref: 'Calls'
  }],
});

const CallsInfoSchema = new Schema({
  infoDay: String,
  infoDate: String,
  infoExpireDate: String,
});

const CallsTimetable = model('CallsTimetable', CallsTimetableSchema);
const CallsInfo = model('CallsInfo', CallsInfoSchema);


module.exports = {
  CallsInfo,
  CallsTimetable
};
