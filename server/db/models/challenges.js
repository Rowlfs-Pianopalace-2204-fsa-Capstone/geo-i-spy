/** @format */

const Sequelize = require('sequelize');
const db = require('../db');

const Challenge = db.define('challenge', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  difficulty: {
    type: Sequelize.STRING,
    defaultValue: 'easy',
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  score: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 100,
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Challenge;
