const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require("../config/passport");

router.get("/api/user/:id", (req, res) => {
  db.User.findAll({
    where: {
      id: req.params.id
    },
    include: [db.Wine]
  })
    .then(results => res.json(results))
    .catch(error => res.json(error))
})


// passport provides an authenticate() function, which is used as route middleware to authenticate requests
router.post('/login',
  passport.authenticate('local'),
  function (req, res) {
    console.log('Login successful')
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/');
  });

// router.post('/login',
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login'
//   }));


// add { failureRedirect: '/login' } when that route is created
// passport.authenticate('local'),
// function (req, res) {
//   { failureRedirect: '/login' }
// add below line of code when route is created
//   res.redirect('/');
// });

// this will be for the signup.html page when created
router.post("/api/signup", function (req, res) {
  db.User.create({
    email: req.body.email,
    password: req.body.password
  })
    // refer to passport documentation
    // .then(function() {
    //     res.redirect(307, "/api/login");
    //   })
    .then(results => res.json(results))
    .catch(function (err) {
      res.status(401).json(err);
    });
});

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});


module.exports = router;