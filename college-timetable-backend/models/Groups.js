const { Schema, model } = require('mongoose');

const Groups = new Schema({
  groupName: String,
});

module.exports = model('Группы', Groups);
