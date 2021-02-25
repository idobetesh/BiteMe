const User = require("./Models/user");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;
const passport = require("passport");

module.exports = function (passport) {
  passport.use (
    new localStrategy((username, password, done) => {
      // Match user
      User.findOne({ username: username }, (err, user) => {
        if (err) console.log(err);/* throw err; */
        if (!user) {
          return done(null, false,{message: "The username is not found"});
        }
        // Match passwords
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) console.log(err);
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null,user.id);
  });
  passport.deserializeUser((_id, cb) => {
    User.findOne({ _id: _id }, (err, user) => {
      const userInformation = {
        username: user.name,
      };
      cb(err, userInformation);
    });
  });
};