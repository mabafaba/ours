const sequelize = require('sequelize');
const DataTypes = require('sequelize/lib/data-types');
const db = require('../config/db');

const User = db.define('User', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  hashed_password:{
    type: DataTypes.BLOB
  },
    salt:{
    type: DataTypes.BLOB
  },
    name:{
    type: DataTypes.TEXT
  },
  email:{
    type: DataTypes.TEXT,
    unique: true
  }
}, {
  // Other model options go here
});

module.exports = User;