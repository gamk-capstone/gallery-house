const Sequelize = require('sequelize')
const db = require('../db')
require("dotenv").config();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 5;
const JWT = process.env.JWT;

/**
 * `User` model has columns `username` and `password`
 * username [string] - must be unique and cannot be null
 * password [string]
 */
const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
  }
})

module.exports = User;

/**
 * instanceMethods on `User` model
 */
User.prototype.correctPassword = function(candidatePwd) {
  //Compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
}

User.prototype.generateToken = function() {
  //Generate the token with .sign method
  return jwt.sign({id: this.id}, JWT)
}

/**
 * classMethods on `User` model
 */
User.authenticate = async function({ username, password }){
    const user = await this.findOne({where: { username }})
    if (!user || !(await user.correctPassword(password))) {
      const error = Error('Incorrect username/password');
      error.status = 401;
      throw error;
    }
    return user.generateToken();
};

User.findByToken = async function(token) {
  try {
    const {id} = await jwt.verify(token, JWT)
    const user = User.findByPk(id)
    if (!user) {
      throw 'nooo'
    }
    return user
  } catch (ex) {
    const error = Error('bad token')
    error.status = 401
    throw error
  }
}

/**
 * hooks
 */
const hashPassword = async(user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
}

User.beforeCreate(hashPassword)
User.beforeUpdate(hashPassword)
User.beforeBulkCreate(users => Promise.all(users.map(hashPassword)))
