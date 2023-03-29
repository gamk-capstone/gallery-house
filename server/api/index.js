const router = require("express").Router();
module.exports = router;

const cors = require('cors');
const bodyParser = require("body-parser");

router.use(cors());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


/**
 * This is like a table of contents for our routers.
 * Instead of having all our express routes here, we've separated them out into different files, and required the routers here.
 */
router.use("/users", require("./users"));
router.use("/art", require("./art"));
router.use("/user", require("./user"));
router.use("/walls", require("./walls"))

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
