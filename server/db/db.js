const Sequelize = require('sequelize')
const pkg = require('../../package.json')
require("dotenv").config()

// databaseName used for testing on local machine
const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const config = {
  logging: false,
};

if(process.env.LOGGING === 'true'){
  delete config.logging
}

https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
if(process.env.DATABASE_URL){
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  };
}

const db = new Sequelize(
  // `postgres://localhost:5432/${databaseName}?sslmode=disable`, //comment out this line to connect to db hosted on bit.io
  // || 
  process.env.DATABASE_URL, //comment out this link to conneect to postgres db on your local machine
  config)
module.exports = db

// Our url for connected to postgres on our local machine
// `postgres://localhost:5432/${databaseName}`,
