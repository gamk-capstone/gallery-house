const Sequelize = require("sequelize");
const db = require("../db");

const SavedWall = db.define("wall", {
  images: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
});

module.exports = SavedWall;
