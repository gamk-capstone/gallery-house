const Sequelize = require("sequelize");
const db = require("../db");

/**
 * `ArtOnWall` model is created by Advanced M:N Associations.
 * https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/
 */
const ArtOnWall = db.define("artOnWall", {});

module.exports = ArtOnWall;
