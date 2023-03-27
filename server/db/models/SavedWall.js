const Sequelize = require("sequelize");
const db = require("../db");

const SavedWall = db.define("wall", {
  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  images: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
});

module.exports = SavedWall;
