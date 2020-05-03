const { Router } = require('express');
const ClassesTimetable = require('../models/ClassesTimetable');

const router = Router();

router.get('/api/classTimetable', async (req, res) => {
  try {
    const classes = await ClassesTimetable.find({});
    res.send(classes);
  } catch (err) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

router.get('/api/classTimetable/:week&:group', async (req, res) => {
  try {
    const timetable = await ClassesTimetable.find({
      week: req.params.week,
      group: req.params.group,
    });
    res.send(timetable);
  } catch (err) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

router.get('/api/classTimetable/groups/:group', async (req, res) => {
  try {
    const group = await ClassesTimetable.find({ group: req.params.group });
    if (group.length === 0) {
      console.log('Группы с таким названием нет');
    } else {
      console.log(group);
    }
    res.send(group);
  } catch (err) {
    res.status(500).json({ message: 'Группы с таким названием нет' });
  }
});

router.get('/api/classTimetable/groups/', async (req, res) => {
  try {
    const groups = await ClassesTimetable.find({ }).select('group');
    res.send(groups);
  } catch (err) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

module.exports = router;
