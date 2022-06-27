var express = require("express");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");

var crypto = require("crypto");
var db = require("../config/db");
const Users = require("../models/user");
// define how to check password
passport.use(
  new LocalStrategy(function verify(username, password, done) {
    Users.findOne({ where: { username: username } })
      .then((user) => {
        console.log(user);
        if (!user) {
          //if there's no user
          console.log("----- !user");
          return done(null, false, {
            message: "Incorrect username or password.",
          });
        } else {
          // otherwise check password
          crypto.pbkdf2(
            password,
            user.salt,
            310000,
            32,
            "sha256",
            function (err, hashedPassword) {
              if (
                !crypto.timingSafeEqual(user.hashed_password, hashedPassword)
              ) {
                return done(null, false, {
                  message: "Incorrect username or password.",
                });
              }
              return done(null, user);
            }
          );
        }
      })
      .catch((err) => done(err));
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

module.exports = passport;
