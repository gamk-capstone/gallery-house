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
      type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.INTEGER)),
      defaultValue: []
    },
    complimentaryColor: {
      type: Sequelize.ARRAY(Sequelize.INTEGER)
    }
  })

module.exports = UserArt;