const router = require('express').Router()
const { models: { Art, UserArt }} = require('../db')
module.exports = router

//route for getting all userArt
router.get("/user", async (req, res, next) => {
  try {
    const userArt = await UserArt.findAll();
    res.json(userArt);
  } catch (err) {
    next (err)
  }
});

//route for getting one userArt
router.get("/user/:id", async (req, res, next) => {
  try {
    const userArt = await UserArt.findByPk(req.params.id);
    res.json(userArt);
  } catch (err) {
    next (err)
  }
});

//route for posting a new userArt
router.post("/user", async (req, res, next) => {
  try {
    res.status(201).send(await UserArt.create(req.body));
  } catch (err) {
    next(err);
  }
});

//route for editing userArt
router.put("/user/:id", async (req, res, next) => {
  try {
    const userArt = await UserArt.findByPk(req.params.id);
    res.json(await userArt.update(req.body));
  } catch (err) {
    next (err);
  }
})