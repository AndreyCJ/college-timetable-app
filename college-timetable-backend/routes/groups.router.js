const { Router } = require('express');
const Groups = require('../models/Groups');

const router = Router();

router.get('/api/groups', async (req, res) => {
  try {
    const groups = await Groups.find({});
    res.send(groups);
  } catch (err) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

router.get('/api/groups/:group', async (req, res) => {
  try {
    const group = await Groups.find({ groupName: req.params.group });
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

module.exports = router;
