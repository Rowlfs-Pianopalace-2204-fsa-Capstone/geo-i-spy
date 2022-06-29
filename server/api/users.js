const router = require("express").Router();
import requireToken from "../gateKeepingMiddleware";

const {
  models: { User },
} = require("../db");
module.exports = router;

router.get("/", requireToken, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: ["id", "username", "email"],
    });
    res.send(user);
  } catch (err) {
    next(err);
  }
});
