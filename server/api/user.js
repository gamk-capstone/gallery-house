const router = require("express").Router();
const {
  models: { User, ArtOnWall, Wall },
} = require("../db");
module.exports = router;

//route for getting single gallery
router.get("/users/:id/galleries/:id", async (req, res, next) => {
  try {
    const userGalleries = await Wall.findAll({
      where: {
        userId: req.params.userId,
      },
      include: { model: ArtOnWall}
    });
    res.json(userGalleries);
  } catch (err) {
    next(err);
  }
});


//route for getting all galleries
router.get("/users/:id/galleries", async (req, res, next) => {
  try {
    const allUserGalleries = await Wall.findByPk(req.params.id);
    res.json(allUserGalleries);
  } catch (err) {
    next(err);
  }
});
