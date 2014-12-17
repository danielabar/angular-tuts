var express = require('express'),
  morgan    = require('morgan'),
  api       = require('./api')
  app       = express();

app
  .use(morgan('dev'))
  .use(express.static('./public'))
  // prefix all routes in api object with /api
  .use('/api', api)
  .get('*', function(req, res) {
    res.sendFile('public/main.html', { root: __dirname });
  })
  .listen(3000);