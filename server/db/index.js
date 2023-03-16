//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Art = require("./models/Art");
const Wall = require("./models/Wall");

//associations could go here!
Wall.belongsTo(User);
Art.belongsToMany(Wall, { through: "ArtOnWall" });
Wall.belongsToMany(Art, { through: "ArtOnWall" });

module.exports = {
  db,
  models: {
    User,
    Art,
    Wall,
  },
};
