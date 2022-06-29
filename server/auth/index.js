/** @format */

const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    res.send({
      token: await User.authenticate({
        username: req.body.username,
        password: req.body.password,
      }),
    });
  } catch (err) {
    next(err);
  }
});
router.post('/signup', async (req, res, next) => {
  try {
    console.log(process);
    // console.log('THIS RAN');
    const user = await User.create({
      // email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });
    // console.log('THIS RAN2', user);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    let user = await User.findByToken(req.headers.authorization);
    user = await User.findByPk(user.id, {
      attributes: ['username', 'id', 'isAdmin'],
    });
    res.send(user);
  } catch (ex) {
    next(ex);
  }
});
