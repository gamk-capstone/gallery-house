const Sequelize = require("sequelize");
const db = require("../db");

/**
 * `Wall` model has column for `name`.
 * name [string] - can be null
 * images [[string]] - can be null
 */
const Wall = db.define("wall", {
  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  // images: {
  //   type: Sequelize.ARRAY(Sequelize.STRING),
  //   allowNull: true,
  // },
});

module.exports = Wall;
