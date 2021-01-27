  
const User = require("./Models/user");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;
const passport = require("passport");

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) console.log('ERROR!');/* throw err; */
        if (!user) console.log('Did not found the user');/* return done(null, false); */
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) console.log('Another error!');/* throw err; */
          if (result === true) {
            console.log('Done 1');
            return done(null, user);
          } else {
            /* return done(null, false); */
            console.log('done 222');
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    console.log("in serialize");
    cb(null, user._id);
    console.log("in serialize2");
  });
  passport.deserializeUser((id, cb) => {
    console.log("in deserialized");
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        username: user.name,
      };
      cb(err, userInformation);
    });
  });
};