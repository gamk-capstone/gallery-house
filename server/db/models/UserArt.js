const Sequelize = require('sequelize');
const db = require('../db');

/**
 * `UserArt` model has columns for `name`, `s3Url`, `mainColors`, and `complimentaryColor`.
 * name [string] - cannot be null
 * s3Url [string] - cannot be null
 * mainColors [[integer]] - defaultValue is an empty array 
 * complimentaryColor [integer] 
 */
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