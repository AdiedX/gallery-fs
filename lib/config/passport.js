

'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    LinkedInStrategy = require('passport-linkedin').Strategy;

// LINKEDIN KEYS:
var LINKEDIN_API_KEY = '775wtefbwpel6v';
var LINKEDIN_SECRET_KEY = 'A9pd6L49N4anWnnY';

/**
 * Passport configuration
 */
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findOne({
    _id: id
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    done(err, user);
  });
});

// // add other strategies for more authentication flexibility
// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password' // this is the virtual field on the model
//   },
//   function(email, password, done) {
//     User.findOne({
//       email: email.toLowerCase()
//     }, function(err, user) {
//       if (err) return done(err);

//       if (!user) {
//         return done(null, false, {
//           message: 'This email is not registered.'
//         });
//       }
//       if (!user.authenticate(password)) {
//         return done(null, false, {
//           message: 'This password is not correct.'
//         });
//       }
//       return done(null, user);
//     });
//   }
// ));

passport.use(new LinkedInStrategy({
    consumerKey: LINKEDIN_API_KEY,
    consumerSecret: LINKEDIN_SECRET_KEY,
    callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback"
}, function(token, tokenSecret, profile, done){
        // Asynchronous verification, for effect ...
        process.nextTick(function(){
            // To keep the example simple, the user's LinkedIn profile is returned to represent the logged-in user.  In a typical applicatin, you would want to associate the LinkedIn account with a user record in your database and return that user instead.
            // [PENDING] the function
            return done(null, profile);
        });
    }
));

module.exports = passport;





