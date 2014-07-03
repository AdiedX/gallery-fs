

'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    middleware = require('./middleware'),
    passport = require('passport');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.route('/api/awesomeThings')
    .get(api.awesomeThings);

  app.route('/api/users')
    .post(users.create)
    .put(users.changePassword);
  app.route('/api/users/me')
    .get(users.me);
  app.route('/api/users/:id')
    .get(users.show);

  app.route('/api/session')
    .post(session.login)
    .delete(session.logout);

  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);

//-------------------------------------------------------------------
    // LINKEDIN AUTHENTICATION ROUTES:
app.get('/auth/linkedin',
  passport.authenticate('linkedin'));

app.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
    // app.route('/auth/linkedin').get(function(req, res) {
    //     passport.authenticate('linkedin', {
    //         scope: ['r_basicprofile', 'r_emailaddress']
    //     })
    // });

    // app.route('auth/linkedin/callback').get(function(req, res) {
    //     passport.authenticate('linkedin', {
    //         failureRedirect: 'login'
    //     }),
    //     function(req, res){
    //         res.redirect('/');
    //     }
    // });

    app.get('/logout', function(req, res){
        req.logout();
        red.redirect('/');
    });
    app.route('/*')
        .get( middleware.setUserCookie, index.index);
//-------------------------------------------------------------------
};
