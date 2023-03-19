const Sequelize = require('sequelize');
const db = require('../db');

const UserArt = db.define('userArt', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    s3Url: {
      type: Sequelize.STRING,
      allowNull: false
    },
     mainColors: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: []
    },
    complimentaryColor: {
      type: Sequelize.STRING
    }
  })

module.exports = UserArt;