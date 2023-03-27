const router = require("express").Router();
const {
  models: { Art, UserArt },
} = require("../db");
const getMainColors = require("../get-images");
module.exports = router;
const { Op } = require("sequelize");
const sequelize = require("sequelize");

//route at /api/art GETS all instances of Art model
router.get("/etsyArt", async (req, res, next) => {
  try {
    const estyArt = await Art.findAll();
    res.json(estyArt);
  } catch (err) {
    next(err);
  }
});

//route for getting all userArt of one user
router.get("/user/all/:id", async (req, res, next) => {
  try {
    const userArt = await UserArt.findAll({
      where: { userId: req.params.id },
    });
    res.json(userArt);
  } catch (err) {
    next(err);
  }
});

//route /api/art/user/:id GETS just one instance of UserArt based on its primary key
router.get("/user/:id", async (req, res, next) => {
  try {
    const userArt = await UserArt.findByPk(req.params.id);
    res.json(userArt);
  } catch (err) {
    next(err);
  }
});

//route at /api/art/user/:id DELETES a single UserArt
router.delete("/user/:id", async (req, res, next) => {
  try {
    const userArt = await UserArt.findByPk(req.params.id);
    res.json(userArt);
  } catch (err) {
    next(err);
  }
});

//route at /api/art/user POSTS new instance of UserArt
router.post("/user", async (req, res, next) => {
  try {
    // const complimentaryColor = (hslArr) => {
    //   const h = hslArr[0];
    //   const s = hslArr[1];
    //   const l = hslArr[2];
    //   const o = hslArr[3];
    //   if (h >= 180) {
    //     return [h - 180, s, l, o];
    //   }
    //   return [h + 180, s, l, o];
    // };
    const complimentaryColor = (hslArr) => {
      const h = hslArr[0];
      const s = hslArr[1];
      const l = hslArr[2];
      const o = hslArr[3];
      let newHue = 0;
      //h = red // return green
      if ((h) => 330 || h < 10) {
        newHue = 120;
        //h = orange // return blue
      }
      if ((h) => 10 && h < 40) {
        newHue = 220;
        //h = yellow // return purple
      }
      if (h >= 40 && h < 70) {
        newHue = 300;
        //h = green // return red
      }
      if (h >= 70 && h < 160) {
        newHue = 0;
        //h = blue // return orange
      }
      if (h >= 160 && h < 250) {
        newHue = 30;
        //h = purple // return yellow
      }
      if (h >= 250 && h < 330) {
        newHue = 45;
      }
      return [newHue, s, l, o];
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

//route at /api/art/:hueNum GETS instances of Art model, one of who's 4 main colors have hue greater than 200
//the findAndCountAll method returns an object with two properties:
// count - an integer - the total number records matching the query
// rows - an array of objects - the obtained records
router.get("/etsyArt/:hueNum/:limit", async (req, res, next) => {
  try {
    const estyArtByColor = await Art.findAndCountAll({
      where: {
        [Op.and]: [sequelize.literal(
          `colors[1][1] BETWEEN ${req.params.hueNum - 10} AND ${
            req.params.hueNum + 10
          }`
        ),
        sequelize.literal(
          `colors[1][2] BETWEEN 5 AND 100`
        )]
      },
      limit: req.params.limit, //this is where we can pass down the number of frames to get the right number of images
      order: sequelize.fn("RANDOM"), //returns data in random order on each call
    });
    console.log(estyArtByColor);
    res.json(estyArtByColor);
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
