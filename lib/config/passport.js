

'use strict';
// Need mongoose to import User model:
var mongoose = require('mongoose'),
    // Load the User model:
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
// module.exports = function(passport){
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

    // LOCAL AUTHENTICATION STRATEGY:
    // Add other strategies for more authentication flexibility
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password' // this is the virtual field on the model
      },
      function(email, password, done) {
        User.findOne({
          email: email.toLowerCase()
        }, function(err, user) {
          if (err) return done(err);

          if (!user) {
            return done(null, false, {
              message: 'This email is not registered.'
            });
          }
          if (!user.authenticate(password)) {
            return done(null, false, {
              message: 'This password is not correct.'
            });
          }
          return done(null, user);
        });
      }
    ));

    // LINKEDIN AUTHENTICATION STRATEGY:
    passport.use(new LinkedInStrategy({
        consumerKey: LINKEDIN_API_KEY,
        consumerSecret: LINKEDIN_SECRET_KEY,
        callbackURL: "http://127.0.0.1:9000/auth/linkedin/callback",
        profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline']
        // Anonymous callback of LinkedInStrategy:
    }, function(token, tokenSecret, profile, done){
            // Asynchronous verification, for effect ...
            console.warn('running');
            console.log(profile);
            process.nextTick(function(){
                // To keep the example simple, the user's LinkedIn profile is returned to represent the logged-in user.  In a typical application, you would want to associate the LinkedIn account with a user record in your database and return that user instead.
                User.findOne({ 'linkedin.id': profile.id },
                    function(err, user){
                    if (err){
                        return done(err);
                    }
                    if (user){
                        return done(null, user);
                    }
                    else{
                        var newUser = new User();
                        // Set all of the LinkedIn information in our user model:
                        newUser.linkedin.id = profile.id;
                        newUser.linkedin.token = token;
                        newUser.linkedin.firstName = profile.first-name;
                        newUser.linkedin.lastName = profile.last-name;
                        // LinkedIn user's emails are private.
                        // Save our user to the database:
                        newUser.save(function(err){
                            if (err)
                                throw err;
                            // If successful, return the new user:
                            return done(null, newUser);
                        });
                    }
                });
            });
        }
    ));
// };

module.exports = passport;





