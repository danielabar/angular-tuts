var express = require('express'),
  morgan = require('morgan'),
  app = express();

app
  .use(morgan('dev'))
  .use(express.static('./public'))
  .get('*', function(req, res) {
    res.sendFile('public/main.html', { root: __dirname });
  })
  .listen(3000);