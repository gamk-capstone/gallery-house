const Sequelize = require('sequelize');
const db = require('../db');

const UserArt = db.define('userArt', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
     colors: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      defaultValue: []
    },
    complimentaryColor: {
      type: Sequelize.STRING
    }
  })

module.exports = UserArt;