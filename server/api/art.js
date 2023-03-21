const router = require("express").Router();
const {
  models: { Art, User, UserArt },
} = require("../db");
const getMainColors = require("../get-images");
module.exports = router;

//route for getting all userArt
router.get("/user", async (req, res, next) => {
  try {
    const userArt = await UserArt.findAll();
    res.json(userArt);
  } catch (err) {
    next(err);
  }
});

//route for getting all userArt of one user
router.get("/user/all/:id", async (req, res, next) => {
  try {
    const userArt = await UserArt.findAll({
      where: { userId: req.params.id }
    });
    res.json(userArt);
  } catch (err) {
    next(err);
  }
});

//route for getting single userArt
router.get("/user/:id", async (req, res, next) => {
  try {
    const userArt = await UserArt.findByPk(req.params.id);
    res.json(userArt);
  } catch (err) {
    next(err);
  }
});

//route for posting a new userArt
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

//route for editing userArt
router.put("/user/:id", async (req, res, next) => {
  try {
    const userArt = await UserArt.findByPk(req.params.id);
    res.json(await userArt.update(req.body));
  } catch (err) {
    next(err);
  }
});