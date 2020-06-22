const AdminBro = require('admin-bro');
const mongoose = require('mongoose');
const AdminBroMongoose = require('admin-bro-mongoose');

AdminBro.registerAdapter(AdminBroMongoose);

/** @type {AdminBro.AdminBroOptions} */
const options = {
  databases: [mongoose],
  branding: {
    companyName: 'Расписание колледжа',
    softwareBrothers: false,
    logo: 'https://raw.githubusercontent.com/AndreyCJ/college-timetable-frontend/master/public/admin-logo.png',
    favicon: 'https://raw.githubusercontent.com/AndreyCJ/college-timetable-frontend/master/public/favicon.ico'
  },
  locale: {
    language: 'ru',
    translations: {
      labels: {
        Calls: 'Информация о звонках',
        Groups: 'Группы',
        CallsTimetable: 'Расписание звонков',
        CallsInfo: 'Дополнительная информация о расписании звонков',
        ClassTimetable: 'Расписание занятий'
      },
      properties: {
        className: 'Название занятия',
        time: 'Время',
        groupName: 'Название группы',
        infoDay: 'Заголовок страницы',
        infoDate: 'Дополнительная информация 1',
        infoExpireDate: 'Дополнительная информация 2',
        shiftNum: 'Номер смены',
        CallsArr: 'Таблица расписания звонков',
        teacher: 'Преподаватель',
        classNum: 'Номер занятия',
        classTime: 'Время занятия',
        room: 'Номер кабинета',
        day: 'День недели (Пн-пт)',
        group: 'Группа',
        week: 'Четность недели (Четная/Нечетная)'
      }
    },
    
  },
};

module.exports = options;
