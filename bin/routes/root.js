var express = require('express');
var router = express.Router();
var organizationalChartJSON = require('../data/organizationalChart.json');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'FG-Study - Organizational Chart' });
});
router.get('/data', (req, res, next) => {
  res.json(organizationalChartJSON);
});

module.exports = router;
