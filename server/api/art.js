const router = require("express").Router();
const {
  models: { Art, UserArt },
} = require("../db");
const getMainColors = require("../get-images");
module.exports = router;
const { Op } = require("sequelize");
const sequelize = require("sequelize");

//New imports ---Moving user art upload to backend
const AWS = require("aws-sdk");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
require('dotenv').config()
// import fileType from 'file-type';

//route at /api/art GETS all instances of Art model
router.get("/etsyArt", async (req, res, next) => {
  try {
    const estyArt = await Art.findAll();
    res.json(estyArt);
  } catch (err) {
    next(err);
  }
});

//route at /api/art/user/all/:id GETS all instances of UserArt for one user based on id
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

//route at /api/art/user/:id DELETES a single UserArt instance based on its id
router.delete("/user/:id", async (req, res, next) => {
  try {
    const userArt = await UserArt.findByPk(req.params.id);
    res.json(userArt);
  } catch (err) {
    next(err);
  }
});

const accessKey = process.env.ACCESS_KEY_ID;
const secretKey = process.env.SECRET_ACCESS_KEY;
const region = process.env.REGION;

// const s3 = new AWS.S3();
const s3 = new AWS.S3({
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
  region: region,
});

// router.get("/check", (req, res) => {
//     res.json({'message': 'ok'});
// })
// AWS.config.update({
//   accessKeyId: 'AKIA2TK54RLQLTXKGZ7Y',
//   secretAccessKey: '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',
//   region: "us-east-1",
//   signatureVersion: "v4",
// });

router.post("/uploadfile", upload.single("file"), (req, res) => {
  // console.log(req);
  console.log("req.file", req.file);
  if (req.file == null) {
    return res.status(400).json({ message: "Please choose the file" });
  }
  const file = req.file;

  const uploadToS3 = (file) => {
    // if (!file) {
    //   return;
    // }
    const fileStream = fs.createReadStream(file.path);

    const params = {
      Bucket: "gamkgalleryhouse",
      Key: `${Date.now()}.${file.name}`,
      Body: fileStream,
    };

    // s3.upload(params, function (err, data) {
    //   console.log(data);
    //   if (err) {
    //     throw err;
    //   }
    //   console.log(`File uploaded successfully.
    //   ${data.Location}`);
    // });
    const { Location } = s3.upload(params).promise();
    console.log("uploading to s3", Location);
  };
  uploadToS3(file);
  res.status(201);
  // const complimentaryColor = (hslArr) => {
  //   const h = hslArr[0];
  //   const s = hslArr[1];
  //   const l = hslArr[2];
  //   const o = hslArr[3];
  //   let newHue = 0;
  //   //h = red // return green
  //   if ((h) => 330 || h < 10) {
  //     newHue = 120;
  //     //h = orange // return blue
  //   }
  //   if ((h) => 10 && h < 40) {
  //     newHue = 220;
  //     //h = yellow // return purple
  //   }
  //   if (h >= 40 && h < 70) {
  //     newHue = 300;
  //     //h = green // return red
  //   }
  //   if (h >= 70 && h < 160) {
  //     newHue = 0;
  //     //h = blue // return orange
  //   }
  //   if (h >= 160 && h < 250) {
  //     newHue = 30;
  //     //h = purple // return yellow
  //   }
  //   if (h >= 250 && h < 330) {
  //     newHue = 45;
  //   }
  //   return [newHue, s, l, o];
  // };
  // console.log("req.body.s3Url", req.body.s3Url);

  // const hslColors = await getMainColors(req.body.s3Url);
  // // const hslColors = await getMainColors(file);
  // console.log("hslColors", hslColors);
  // const compColor = complimentaryColor(hslColors[0]);
  // console.log("compColor", compColor);
  // req.body.mainColors = hslColors;
  // req.body.complimentaryColor = compColor;

  // res.status(201).send(await UserArt.create(req.body));
});

//route at /api/art/user POSTS a new instance of UserArt
// router.post("/user", async (req, res, next) => {
//   try {
//     const complimentaryColor = (hslArr) => {
//       const h = hslArr[0];
//       const s = hslArr[1];
//       const l = hslArr[2];
//       const o = hslArr[3];
//       let newHue = 0;
//       //h = red // return green
//       if ((h) => 330 || h < 10) {
//         newHue = 120;
//         //h = orange // return blue
//       }
//       if ((h) => 10 && h < 40) {
//         newHue = 220;
//         //h = yellow // return purple
//       }
//       if (h >= 40 && h < 70) {
//         newHue = 300;
//         //h = green // return red
//       }
//       if (h >= 70 && h < 160) {
//         newHue = 0;
//         //h = blue // return orange
//       }
//       if (h >= 160 && h < 250) {
//         newHue = 30;
//         //h = purple // return yellow
//       }
//       if (h >= 250 && h < 330) {
//         newHue = 45;
//       }
//       return [newHue, s, l, o];
//     };

//     const hslColors = await getMainColors(req.body.s3Url);

//     const compColor = complimentaryColor(hslColors[0]);

//     req.body.mainColors = hslColors;
//     req.body.complimentaryColor = compColor;

//     res.status(201).send(await UserArt.create(req.body));
//   } catch (err) {
//     next(err);
//   }
// });

//route at /api/art/:hueNum/:limit GETS instances of Art model, one of who's 4 main colors have hue greater than 200
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

//route at /api/user/:id PUTS (updates) one instance of UserArt based on its primary key
router.put("/user/:id", async (req, res, next) => {
  try {
    const userArt = await UserArt.findByPk(req.params.id);
    res.json(await userArt.update(req.body));
  } catch (err) {
    next(err);
  }
});
