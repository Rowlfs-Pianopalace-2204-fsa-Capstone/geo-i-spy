/** @format */

const router = require('express').Router();
// const requireToken = require("./gateKeepingMiddleware");

const {
  models: { Challenge },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await Challenge.findAll({
      where: { userId: req.body.id },
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
