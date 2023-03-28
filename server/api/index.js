const router = require("express").Router();
module.exports = router;

/**
 * This is like a table of contents for our routers.
 * Instead of having all our express routes here, we've separated them out into different files, and required the routers here.
 */
router.use("/users", require("./users"));
router.use("/art", require("./art"));
router.use("/walls", require("./walls"))

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
