const router = require("express").Router();
const {
  models: { SavedWall },
} = require("../db");
module.exports = router;


//route at /api/user/:userId/walls GETS all instances of Wall model for a single user based on thier userId
router.get("/:userId/walls", async (req, res, next) => {
  try {
    res.send(await SavedWall.findAll({
      where: {
        userId: req.params.userId
      }
    }));
  } catch (error) {
    next(error);
  }
});

// //route at /api/:userId/galleries/:galleryId GETS one saved wall for a user based on thier userId
// router.get("/:userId/galleries/:galleryId", async (req, res, next) => {
//   try {
//     const userGalleries = await Wall.findByPk(req.params.galleryId,{
//       where: {
//         userId: req.params.userId,
//       },
//       include: { model: ArtOnWall}
//     });
//     res.json(userGalleries);
//   } catch (err) {
//     next(err);
//   }
// });


// //route at /api/:userId/galleries GETS all saved walls for a user based on their userId
// router.get("/:userId/galleries", async (req, res, next) => {
//   try {
//     const allUserGalleries = await Wall.findAll({
//       where: {
//         userId: req.params.userId,
//       },
//       include: ArtOnWall
//     });
//     res.json(allUserGalleries);
//   } catch (err) {
//     next(err);
//   }
// });

