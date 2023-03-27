const router = require("express").Router();
const {
  models: { SavedWall },
} = require("../db");
module.exports = router;

//route at /api/walls/user/:userId GETS all instances of Wall model for a single user based on thier userId
router.get("/user/:userId", async (req, res, next) => {
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

//route at /api/walls/:wallId/user/:userId GETS a single instance of Wall model for a single user based on its wallId
router.get("/:wallId/user/:userId", async (req, res, next) => {
  try {
    console.log(req.params)
    res.send(await SavedWall.findAll({
      where: {
        id: req.params.wallId,
        userId: req.params.userId
      }
    }));
  } catch (error) {
    next(error);
  }
});


//route at /api/walls POSTS an instance of Wall model
router.post("/", async (req, res, next) => {
  try {
    // const { savedWallImages } = req.body;
    res.status(201).json(await SavedWall.create(req.body));
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE `/api/walls/:wallId` is a route to remove a wall (based on its id).
 */
router.delete("/:wallId", async (req, res, next) => {
  try {
    const wall = await SavedWall.findByPk(req.params.wallId);
    await wall.destroy();
    res.send(wall);
  } catch (error) {
    next(error);
  }
});
