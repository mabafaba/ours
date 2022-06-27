const express  = require('express');
const crypto = require('crypto');
const passport = require('../config/passport');

const Users = require('../models/user')

getLogin = (req, res, next) => {
  console.log("going to login page!");
  res.render('login');
}

getSignup = (req,res,next) => {
  console.log("going to signup page!");
  res.render('signup');
}

postLogin = function(req,res,next) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })(req,res);

}

logout = (req,res,next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
}


postSignup = (req,res,next) => {

  var salt = crypto.randomBytes(16);
  crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
    if (err) { return next(err); }

    Users
    .create(
    {
    username:req.body.username, 
    hashed_password:hashedPassword,
    salt:salt,
    email:req.body.email
  }
  ) 
    .then((user)=>{console.log(user);return(user)})
    .then((user)=>{ // log the user in
      req.login(user, function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
    }).catch((err)=>{res.send(err)})

  });

}

logUsers = (req,res,next) => {
  Users.findAll()
  .then(allusers =>{console.log(allusers);return(allusers)})
  .then(allusers => res.send(allusers))
  .catch(err=>next(err))

}


module.exports = {
  getLogin,
  getSignup,
  postLogin,
  logout,
  postSignup,
  logUsers
}




