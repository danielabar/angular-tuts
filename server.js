var express = require('express'),
  morgan    = require('morgan'),
  users     = require('./accounts'),
  api       = require('./api'),
  app       = express();

app
  .use(morgan('dev'))
  .use(express.static('./public'))
  // the users route is not prefixed so its used as is
  .use(users)
  // prefix all routes in api object with /api
  .use('/api', api)
  .get('*', function(req, res) {
    if (!req.user) {
      res.redirect('/login');
    } else {
      res.sendFile('public/main.html', { root: __dirname });
    }
  })
  .listen(3000);