var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/active', function(req, res, next) {
  res.render('active', { title: 'Express' });
});

module.exports = router;
