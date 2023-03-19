const router = require('express').Router()
const { models: { Art, UserArt }} = require('../db')
const getMainColors = require("../get-images");
const newColors = require("../get-images")
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
    //calculate images here and include when creating user art
    //specify attributes coming from req.body
    const colors = await getMainColors(req.body.s3Url);
    console.log(req.body.s3Url);
    console.log(`colors: ${colors}`);
    console.log(`colorsType: ${typeof colors[0]}`);
    res.status(201).send(await UserArt.create(
      req.body, 
      { mainColors: colors }
    ));
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
});
