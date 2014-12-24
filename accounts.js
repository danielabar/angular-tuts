/* Could have used passport to do this instead of rolling our own auth */

var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var Bourne = require('bourne');
var crypto = require('crypto');

var router = express.Router();
var db = new Bourne('users.json');

var hash = function(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
};

router
  .use(bodyParser.urlencoded())
  .use(bodyParser.json())

  // Express session middleware makes session object available on all requests
  .use(session({secret: 'RYnvyc7ozQxxLu1DfRW0pmLjDKPZtoLwjxant691OhG4X0f328Hqm92f3MfEafm'}))

  // When user first arrives to site, if they are not logged in, redirect to login page
  .get('/login', function(req, res) {
    res.sendFile('public/login.html', { root: __dirname });
  })

  // When user submits username and password on login page, will post to here
  .post('/login', function(req, res) {
    var user = {
      username: req.body.username,
      password: hash(req.body.password)
    };
    db.findOne(user, function(err, data) {
      if(data) {
        req.session.userId = data.id;
        res.redirect('/contacts');
      } else {
        console.error('Invalid username or password, redirecting to login page');
        res.redirect('/login');
      }
    })
  })

  // Login page will also support creating a new user account
  .post('/register', function(req, res) {
    var user = {
      username: req.body.username,
      password: hash(req.body.password),
      options: {}
    };
    db.find({username: user.username}, function(err, data) {
      if (!data.length) {
        db.insert(user, function(err, data) {
          req.session.userId = data.id;
          res.redirect('/contacts');
        })
      } else {
        res.redirect('/login');
      }
    })
  })

  // Logout
  .get('/logout', function(req, res) {
    req.session.userId = null;
    res.redirect('/');
  })

  // Convenience middleware to run on every request to populate a user object in the session
  .use(function(req, res, next) {
    if (req.session.userId) {
      db.findOne({id: req.session.userId}, function(err, data) {
        req.user = data;
      });
    }
    next();
  });

module.exports = router;