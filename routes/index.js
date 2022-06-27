var express = require("express");
var router = express.Router();

var controllers = {
  user: require("../controllers/user"),
  service: require("../controllers/service"),
};

// static pages

router.get(
  "/",
  (req, res, next) => {
    // if not logged in go to login page
    if (!req.user) {
      return res.render("login");
    }
    next();
  },
  (req, res, next) => {
    // otherwise go to index
    res.locals.filter = null;
    res.render("index", { user: req.user });
  }
);

// Users & Authentification
router.get("/signup", controllers.user.getSignup); // sign up page
router.get("/login", controllers.user.getLogin); // log in page
router.post("/logout", controllers.user.logout); // try loggin out
router.get("/logusers", controllers.user.logUsers);
router.post("/login/password", controllers.user.postLogin); // try loggin in
router.post("/signup", controllers.user.postSignup);

// services
router.post("/service", controllers.service.add);
router.get("/logservices", controllers.service.log);
router.delete("/service/:id", controllers.service.deleteService);

module.exports = router;
