const router = require("express").Router();
const {
  models: { Art, UserArt, SavedEtsyArt },
} = require("../db");
const getMainColors = require("../get-images");
module.exports = router;
const { Op } = require("sequelize");
const sequelize = require("sequelize");

//Imports for UserArt upload feature
const AWS = require("aws-sdk");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
require("dotenv").config();

const accessKey = process.env.AWS_ACCESS_KEY_ID;
const secretKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_REGION;
const bucketName = process.env.AWS_BUCKET_NAME;

//---------------------------------------
//#region UserArt routes
//---------------------------------------

//GET route at /api/art/user/all/:id gets all instances of UserArt for one user based on id
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

//GET route /api/art/user/:id gets just one instance of UserArt based on its primary key
router.get("/user/:id", async (req, res, next) => {
  try {
    const userArt = await UserArt.findByPk(req.params.id);
    res.json(userArt);
  } catch (err) {
    next(err);
  }
});

const s3 = new AWS.S3({
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
  region: region,
  s3BucketEndpoint: true,
  endpoint: "http://" + bucketName + ".s3.amazonaws.com",
});

//POST route at /api/art/uploadfile uploads to s3 bucket and creates and instance of UserArt model
router.post("/uploadfile", upload.single("file"), async (req, res) => {
  if (req.file == null) {
    return res.status(400).json({ message: "Please choose the file" });
  }
  let file = req.file;

  const uploadToS3 = (file) => {
    const fileStream = fs.createReadStream(file.path);
    console.log("fileStream", fileStream);

    const params = {
      Bucket: bucketName,
      Key: file.originalname,
      Body: fileStream,
    };

    s3.upload(params, function (err, data) {
      if (err) {
        throw err;
      }
      console.log(`File uploaded successfully.
      ${data.Location}`);
    });
  };
  uploadToS3(file);

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
  const s3Url =
    "http://" + bucketName + ".s3.amazonaws.com/" + file.originalname;

  const hslColors = await getMainColors(s3Url, file.path);
  const compColor = complimentaryColor(hslColors[0]);

  const userArt = {
    name: file.originalname,
    s3Url: s3Url,
    mainColors: hslColors,
    complimentaryColor: compColor,
    userId: req.body.id,
  };

  res.status(201).send(await UserArt.create(userArt));
});

//PUT route at /api/art/user/:id updates one instance of UserArt based on its primary key
router.put("/user/:id", async (req, res, next) => {
  try {
    const userArt = await UserArt.findByPk(req.params.id);
    res.json(await userArt.update(req.body));
  } catch (err) {
    next(err);
  }
});

//DELETE route at /api/art/user/:id deletes a single UserArt instance based on its id
router.delete("/user/:id", async (req, res, next) => {
  try {
    const userArt = await UserArt.findByPk(req.params.id);
    await userArt.destroy();
    res.json(userArt);
  } catch (err) {
    next(err);
  }
});

//#endregion UserArt routes

//---------------------------------------
//#region EtsyArt routes
//---------------------------------------

//GET route at /api/art gets all instances of Art model
router.get("/etsyArt", async (req, res, next) => {
  try {
    const estyArt = await Art.findAll();
    res.json(estyArt);
  } catch (err) {
    next(err);
  }
});

//GET route at /api/art/:hueNum/:limit gets instances of Art model, one of who's 4 main colors have hue greater than 200
// the findAndCountAll method returns an object with two properties:
// count - an integer - the total number records matching the query
// rows - an array of objects - the obtained records
router.get("/etsyArt/:hueNum/:limit", async (req, res, next) => {
  try {
    const estyArtByColor = await Art.findAndCountAll({
      where: {
        [Op.and]: [
          sequelize.literal(
            `colors[1][1] BETWEEN ${req.params.hueNum - 10} AND ${
              req.params.hueNum + 10
            }`
          ),
          sequelize.literal(`colors[1][2] BETWEEN 5 AND 100`),
        ],
      },
      limit: req.params.limit, //this is where we can pass down the number of frames to get the right number of images
      order: sequelize.fn("RANDOM"), //returns data in random order on each call
    });
    res.json(estyArtByColor);
  } catch (err) {
    next(err);
  }
});

//---------------------------------------
//#region SavedEtsyArt routes
//---------------------------------------

//GET route /api/art/etsy/saved/:id gets all of the user's instances of SavedEtsyArt based on the user's id
router.get("/etsy/saved/:id", async (req, res, next) => {
  try {
    const savedEtsyArt = await SavedEtsyArt.findAll({
      where: { userId: req.params.id },
    });
    res.json(savedEtsyArt);
  } catch (err) {
    next(err);
  }
});

//POST route at /api/art/etsy/saved creates one instance of SavedEtsyArt
router.post("/etsy/saved", async (req, res, next) => {
  try {
    res.status(201).json(await SavedEtsyArt.create(req.body));
  } catch (err) {
    next(err);
  }
});

//DELETE route at /api/art/user/:id destroys a single SavedEtsyArt instance
router.delete("/etsy/saved/:id", async (req, res, next) => {
  try {
    const savedEtsyArt = await SavedEtsyArt.findByPk(req.params.id);
    await savedEtsyArt.destroy();
    res.json(savedEtsyArt);
  } catch (err) {
    next(err);
  }
});

router.delete("/etsy/saved/:userId/:etsyId", async (req, res, next) => {
  try {
    const savedEtsyArt = await SavedEtsyArt.findOne({
      where: {
        userId: {
          [Op.eq]: req.params.userId,
        },
        [Op.and]: {
          etsyId: {
            [Op.eq]: req.params.etsyId,
          },
        },
      },
    });
    await savedEtsyArt.destroy();
    res.json(savedEtsyArt);
  } catch (err) {
    next(err);
  }
});

//#endregion SavedEtsyArt routes
