const { Schema, model } = require('mongoose');

const CallsTimetableSchema = new Schema({
  shiftNum: String,
  CallsArr: [{
    type: Schema.Types.ObjectId,
    ref: 'Звонки'
  }],
});

const CallsInfoSchema = new Schema({
  infoDay: String,
  infoDate: String,
  infoExpireDate: String,
});

const CallsTimetable = model('Расписание звонков', CallsTimetableSchema);
const CallsInfo = model('ДопИнфРасписанияЗвонков', CallsInfoSchema);


module.exports = {
  CallsInfo,
  CallsTimetable
};
