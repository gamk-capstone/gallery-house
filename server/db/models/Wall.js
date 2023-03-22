const Sequelize = require("sequelize");
const db = require("../db");

/**
 * `Wall` model has column for `name`.
 * name [string] - cannot be null
 */
const Wall = db.define("wall", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Wall;
