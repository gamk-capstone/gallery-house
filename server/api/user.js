const router = require("express").Router();
const {
  models: { ArtOnWall, Wall },
} = require("../db");
module.exports = router;

//route for getting single gallery
router.get("/:userId/galleries/:galleryId", async (req, res, next) => {
  try {
    const userGalleries = await Wall.findByPk(req.params.galleryId,{
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
router.get("/:userId/galleries", async (req, res, next) => {
  try {
    const allUserGalleries = await Wall.findAll({
      where: {
        userId: req.params.userId,
      },
      include: ArtOnWall
    });
    res.json(allUserGalleries);
  } catch (err) {
    next(err);
  }
});

