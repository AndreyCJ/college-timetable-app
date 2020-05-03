const { Router } = require('express');
const router = Router();

Date.prototype.getWeek = function() {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};

router.get('/api/week', async (req, res) => {
  try {
    const week = new Date().getWeek() % 2 == 0 ? 'Четная' : 'Нечетная';
    res.send(JSON.stringify(week));
  } catch (err) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

// const getWeek = () => {
//   const start = [1, 9];
//   const day = new Date().getDate();
//   const month = new Date().getMonth() + 1;
//   const year = new Date().getFullYear();

//   let monthDelta = 0;
//   let daysInMonth = [];


//   for (i = start[1]; i !== month; i++) {
//     if (i > 12) {
//       i = 1;
//       daysInMonth.push(new Date(year - 1, i, 0).getDate());
//     } else {
//       daysInMonth.push(new Date(year, i, 0).getDate());
//     }
//     monthDelta += 1;
//   }

//   const daysInMonthSumm = daysInMonth.reduce((day, nextDay) => day + nextDay, 0);
//   console.log(daysInMonthSumm)

//   console.log(Math.round(((daysInMonthSumm + day - 1) / 7) + 1), new Date().getWeek());

//   if (new Date().getWeek() % 2 == 0) {
//     console.log('Even Number');
//   }else{
//     console.log('Odd Number');
//   }

//   // for (i = 0; i < 7; i++) {
    
//   //   daysInMonth.push(new Date(year,))
//   // }

//   console.log(day + 4, month, year);
//   console.log(monthDelta, daysInMonth);
// }

// getWeek();

module.exports = router;