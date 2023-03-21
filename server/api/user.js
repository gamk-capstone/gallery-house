const router = require("express").Router();
const {
  models: { ArtOnWall, Wall },
} = require("../db");
module.exports = router;

//route at /api/:userId/galleries/:galleryId GETS one saved wall for a user based on thier userId
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


//route at /api/:userId/galleries GETS all saved walls for a user based on their userId
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

