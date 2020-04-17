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
    res.redirect('/members');
  });

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

// Route for getting the user's email address to be used client side
router.get("/api/user_data", function (req, res) {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  }
});

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});


module.exports = router;