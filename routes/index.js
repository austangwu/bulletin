var express = require('express');
var router = express.Router();
var forecast = require('forecast');


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Bulletin' });
	console.log("calling router.get home page");
});

var forecast = new forecast({
  service: 'forecast.io',
  key: '9cfdff0868949f528506fc3da052c243',
  units: 'c', // Only the first letter is parsed
});

/* GET forecast */
router.get('/forecast', function(req, res, next) {
	forecast.get([42.083012, -88.147655], true, function(err, weather) {
	  	if(err) return console.dir(err);
		res.json(weather);
		console.log(weather);
	});
});


module.exports = router;

