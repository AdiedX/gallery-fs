

'use strict';

var express = require('express'),
    favicon = require('static-favicon'),
    morgan = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    errorHandler = require('errorhandler'),
    path = require('path'),
    config = require('./config'),
    passport = require('passport'),
    mongoStore = require('connect-mongo')(session),
    // STEP 1: Require the passport-linkedin library:
    LinkedInStrategy = require('passport-linkedin').Strategy;

var router = express.Router();


/**
 * Express configuration
 */
module.exports = function(app) {
  var env = app.get('env');

  if ('development' === env) {
    app.use(require('connect-livereload')());

    // Disable caching of scripts for easier testing
    app.use(function noCache(req, res, next) {
      if (req.url.indexOf('/scripts/') === 0) {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');
        res.header('Expires', 0);
      }
      next();
    });

    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'app')));
    app.set('views', config.root + '/app/views');
  }

  if ('production' === env) {
    app.use(compression());
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('views', config.root + '/views');
  }

  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(morgan('dev'));
  app.use(bodyParser());
  app.use(methodOverride());
  app.use(cookieParser());

  // Persist sessions with mongoStore
  app.use(session({
    secret: 'angular-fullstack secret',
    store: new mongoStore({
      url: config.mongo.uri,
      collection: 'sessions'
    }, function () {
      console.log('db connection open');
    })
  }));

//--------------------------------------------------------------
// PASSPORT-LINKEDIN AUTHENTICATION

// STEP 2: Initialize and create persistent login sessions:
  app.use(passport.initialize());
  // The following creates the persisten login sessions:
  app.use(passport.session());

  // STEP 3: Initialize the LinkedIn API and SECRET keys:
  var LINKEDIN_API_KEY = '775wtefbwpel6v';
  var LINKEDIN_SECRET_KEY = 'A9pd6L49N4anWnnY';

  // STEP 4: Passport Session Setup
  // To support persistent Login sessions, Passport needs to be able to serialize users into and deserialize users out of the session.  Typically, this will be as simple as storing the user ID when serializing and finding the user by ID when deserializing.  However, since this example does not have a database for user records, the complete LinkedIn profile is serialized and deserialized:
  passport.serializeUser(function(user, done){
    done(null, user);
  });

  passport.deserializeUser(function(obj, done){
    done(null, obj);
  });

// STEP 5: Use the LinkedInStrategy constructor/class within Passport:
// Strategies in passport require a 'verify' function, which accept credentials (in this case, a token, tokenSecret, and LinkedIn profile), and invoke a callback with a user object.
passport.use(new LinkedInStrategy({
    consumerKey: LINKEDIN_API_KEY,
    consumerSecret: LINKEDIN_SECRET_KEY,
    callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback"
}, function(token, tokenSecret, profile, done){
        // Asynchronous verification, for effect ...
        process.nextTick(function(){
            // To keep the example simple, the user's LinkedIn profile is returned to represent the logged-in user.  In a typical applicatin, you would want to associate the LinkedIn account with a user record in your database and return that user instead.
            return done(null, profile);
        });
    }
));

// STEP 6: AUTHENTICATION REQUESTS:
// GET /auth/linkedin
// Use passport.authenticate() as route middleware to autheticate the request.  The first step in LinkedIn authentication will involve redirecting the user to linkedin.com.  After authentication, LinkedIn will redirect the user back to this application at /auth/linkedin/callback:
router.get('/auth/linkedin', passport.authenticate('linkedin'), function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this function will not be called.
});

// GET /auth/linkedin/callback
// Use passport.authenticate() as route middleware to authenticate the request.  If authentication fails, the user will be redirected back to the Login page.  Otherwise, the primary route function will be called, which, in this example, will redirect the user to the home page.
router.get('auth/linkedin/callback',
    passport.authenticate('linkedin', { failureRedirect: 'login' }),
    function(req, res){
        res.direct('/');
});

router.get('/logout', function(req, res){
    req.logout();
    red.redirect('/');
});

// STEP 7: Simple route middleware to ensure user is authenticated.
// Use this route middleware on any resource that needs to be protected.  If the request is authenticated (typically via a persistent login session), the request will proceed.  Otherwise, the user will be redirected to the login page.
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated())
        return next();
    res.redirect('/login');
}

// END PASSPORT-LINKEDIN AUTHENTICATION.
//--------------------------------------------------------------

  // Error handler - has to be last
  if ('development' === app.get('env')) {
    app.use(errorHandler());
  }
};
