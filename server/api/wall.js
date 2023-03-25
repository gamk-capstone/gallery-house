const router = require("express").Router();
const {
  models: { Wall },
} = require("../db");

//route at /api/wall POSTS an instance of Wall model
router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Wall.create(req.body));
  } catch (err) {
    next(err);
  }
});
