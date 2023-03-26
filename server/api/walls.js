const router = require("express").Router();
const {
  models: { SavedWall },
} = require("../db");
module.exports = router;

//route at /api/walls POSTS an instance of Wall model
router.post("/", async (req, res, next) => {
  try {
    // const { savedWallImages } = req.body;
    res.status(201).json(await SavedWall.create(req.body));
  } catch (err) {
    next(err);
  }
});
