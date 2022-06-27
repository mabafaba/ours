// DEPENDENCIES

require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");
var session = require("express-session");

var SQLiteStore = require("connect-sqlite3")(session);

var db = require("./config/db");

// initiate database
const sequelize = require("sequelize");
const Users = require("./models/user");
const Services = require("./models/service");
// Model relationships
Users.hasMany(Services);
Services.belongsTo(Users);

db.sync({ alter: true }) // NOT for production; see "As shown above, sync({ force: true }) and sync({ alter: true }) can be destructive operations. Therefore, they are not recommended for production-level software. Instead, synchronization should be done with the advanced concept of Migrations, with the help of the Sequelize CLI." https://sequelize.org/docs/v6/core-concepts/model-basics/
  // .sync()
  //.then((result) =>{console.log("db sync:");console.log(result)})
  .catch((err) => {
    console.log(err);
  });

// ROUTES

var router = require("./routes/index");

// APP

var app = express();

app.locals.pluralize = require("pluralize");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public"))); // where to find static files

// SESSIONS & AUTHENTIFICATION

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: "sessions.db", dir: "./var/db" }),
  })
);
app.use(passport.authenticate("session"));

// ROUTES

app.use("/", router);

// ERROR HANDLING

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

// (app is started in /bin/www)
