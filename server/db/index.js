/** @format */

const db = require('./db');
const Challenge = require('./models/challenges');
const Friends = require('./models/friends');
const Hint = require('./models/hint');
const Picture = require('./models/pictures');
const User = require('./models/users');

Challenge.hasMany(Hint);
Hint.belongsTo(Challenge);

Challenge.hasMany(Picture);
Picture.belongsTo(Challenge);

Challenge.belongsToMany(User, { through: 'Achievements' });
User.belongsToMany(Challenge, { through: 'Achievements' });

User.hasMany(Friends);
Friends.belongsTo(User);

module.exports = {
  db,
  models: {
    Friends,
    User,
    Picture,
    Challenge,
    Hint,
  },
};
