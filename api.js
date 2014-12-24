var express = require('express'),
  Bourne = require('bourne'),
  bodyParser = require('body-parser'),

  db = new Bourne('data.json'),
  router = express.Router();

router
  // temporary middleware until we have authentication in place
  .use(function(req, res, next) {
    if (!req.user) req.user = { id : 1};
    next();
  })
  .use(bodyParser.json())
  .route('/contact')
    .get(function(req, res) {
      db.find({userId : parseInt(req.user.id, 10)}, function(err, data) {
        res.json(data);
      });
    })
    .post(function(req, res) {
      var contact = req.body;
      contact.userId = req.user.id;
      db.insert(contact, function(err, data) {
        res.json(data);
      });
    });

router
  .route('/contact/:id')
    .get(function(req, res) {
      db.findOne({ id: parseInt(req.params.id, 10)}, function(err, data) {
        res.json(data);
      });
    })
    .put(function(req, res) {
      var contact = req.body;
      delete contact.$promise;
      delete contact.$resolved;
      db.update({ id: parseInt(req.params.id, 10)}, contact, function(err, data) {
        // db.update supports updating array of items, but we only updated one so return that first one
        res.json(data[0]);
      });
    })
    .delete(function(req, res) {
      db.delete({ id: parseInt(req.params.id, 10)}, function() {
        res.json(null);
      });
    })

module.exports = router;