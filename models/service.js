const sequelize = require("sequelize");
const DataTypes = require("sequelize/lib/data-types");
const db = require("../config/db");

const Service = db.define(
  "Service",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.TEXT,
    },
    geo_lat: {
      type: DataTypes.REAL,
    },
    geo_lon: {
      type: DataTypes.REAL,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = Service;
