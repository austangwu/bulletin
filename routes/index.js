var express = require('express');
var router = express.Router();

// Require the module 
var Forecast = require('forecast');
 
// Initialize 
var forecast = new Forecast({
  service: 'forecast.io',
  key: '9cfdff0868949f528506fc3da052c243',
  units: 'celcius', // Only the first letter is parsed 
});

/* GET home page. */
router.get('/', function(req, res, next) {
	forecast.get([42.153611, -88.131944], true, function(err, weather) {
  		if(err) return console.dir(err);
  		var temp = weather.currently.temperature;
  		res.render('index', { title: 'Bulletin', temp: temp});
	});
}); 
 
module.exports = router;