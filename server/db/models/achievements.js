/** @format */

const Sequelize = require('sequelize');
const db = require('../db');

const Achievements = db.define('Achievement', {
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Achievements;
