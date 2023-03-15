const Sequelize = require('sequelize');
const db = require('../db');

const Art = db.define('art', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    purchaseUrl: {
        type: Sequelize.STRING,
    },
    imageUrl: {
        type: Sequelize.STRING,
    },
     hslColor: {
        type: Sequelize.STRING,
    },
})

module.exports = Art