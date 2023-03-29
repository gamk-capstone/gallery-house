const Sequelize = require("sequelize");
const db = require("../db");

const SavedEtsyArt = db.define("savedEtsyArt", {
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  purchaseUrl: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = SavedEtsyArt;