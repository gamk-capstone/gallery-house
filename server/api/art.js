const router = require("express").Router();
const {
  models: { Art, UserArt },
} = require("../db");
const getMainColors = require("../get-images");
module.exports = router;

// route at /api/user GETS all instances of UserArt model
router.get("/user", async (req, res, next) => {
  try {
    const userArt = await UserArt.findAll();
    res.json(userArt);
  } catch (err) {
    next(err);
  }
});

//route /api/user/:id GETS just one instance of UserArt based on its primary key
router.get("/user/:id", async (req, res, next) => {
  try {
    const userArt = await UserArt.findByPk(req.params.id);
    res.json(userArt);
  } catch (err) {
    next(err);
  }
});

//route at /api/user POSTS new instance of UserArt
router.post("/user", async (req, res, next) => {
  try {
    const complimentaryColor = (hslArr) => {
      const h = hslArr[0];
      const s = hslArr[1];
      const l = hslArr[2];
      const o = hslArr[3];
      if (h >= 180) {
        return [h - 180, s, l, o];
      }
      return [h + 180, s, l, o];
    };

    const hslColors = await getMainColors(req.body.s3Url);

    const compColor = complimentaryColor(hslColors[0]);

    req.body.mainColors = hslColors;
    req.body.complimentaryColor = compColor;
    
    res.status(201).send(await UserArt.create(req.body));
  } catch (err) {
    next(err);
  }
});

//route at /api/user/:id PUTS (updates) one instance of UserArt based on its primary key
router.put("/user/:id", async (req, res, next) => {
  try {
    const userArt = await UserArt.findByPk(req.params.id);
    res.json(await userArt.update(req.body));
  } catch (err) {
    next(err);
  }
});