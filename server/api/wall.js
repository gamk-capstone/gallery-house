const router = require("express").Router();
const {
  models: { Wall },
} = require("../db");

//route at /api/wall POSTS an instance of Wall model
router.post("/wall", async (req, res, next) => {
    try {
      const estyArt = await Wall.create({

      });
      res.json(estyArt);
    } catch (err) {
      next(err);
    }
  });