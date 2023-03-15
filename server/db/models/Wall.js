const Sequelize = require("sequelize");
const db = require("../db");

const Wall = db.define("wall", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = Wall;
