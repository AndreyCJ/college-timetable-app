const { Router } = require('express');
const { CallsTimetable, CallsInfo } = require('../models/CallsTimetable');

const router = Router();

router.get('/api/callsTimetable', async (req, res) => {
  try {
    const callsInfo = await CallsInfo.find({});
    const calls = await CallsTimetable.find({}).populate('CallsArr');
    res.send({ 
      calls,
      callsInfo 
    });
  } catch (err) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

module.exports = router;
