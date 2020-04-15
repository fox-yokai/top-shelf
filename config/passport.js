var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

passport.use(new LocalStrategy(
  {
    usernameField: "email"
  },
  function(email, password, done) {
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function(user) {
        // if (err) {
        //     return done(err);
        // }
        if (!user) {
        return done(null, false, {
          message: "Incorrect email."
        });
      }
     
        if (!user.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password. Please try again."
        });
      }
      return done(null, user);
    }).catch(function(err) {
        return done(err);
    })
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = passport;