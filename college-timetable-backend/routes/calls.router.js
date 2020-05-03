const { Router } = require('express');
const Calls = require('../models/Calls');

const router = Router();

router.get('/api/calls', async (req, res) => {
  try {
    const calls = await Calls.find({});
    res.send(calls);
  } catch (err) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

module.exports = router;
