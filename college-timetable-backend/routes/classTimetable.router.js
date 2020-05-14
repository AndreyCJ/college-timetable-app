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
    const classes = await ClassesTimetable.find({}).populate('group');
    const sortedByWeekAndGroup = [];
    classes.forEach((lesson) => {
      const groups = lesson.group.map(e => e.groupName === req.params.group && e);
      const sortedGroups = groups.filter(e => e !== false);
      if (lesson.week === req.params.week && sortedGroups.length > 0) {
        sortedByWeekAndGroup.push(lesson);
      }
    });
    res.send(sortedByWeekAndGroup);
  } catch (err) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

module.exports = router;
