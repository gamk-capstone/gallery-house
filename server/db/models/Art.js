const Sequelize = require("sequelize");
const db = require("../db");

/**
 * `Art` model has columns for `name`, `purchaseUrl`, `imageUrl`, and `colors`.
 * name [string] - cannot be null
 * purchaseUrl [string]
 * imageUrl [string] - cannot be null
 * colors [[integer]] - defaultValue is an empty array
 */

const Art = db.define("art", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  purchaseUrl: {
    type: Sequelize.STRING,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  colors: {
    type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.INTEGER)),
    defaultValue: [],
  },
});

module.exports = Art;
