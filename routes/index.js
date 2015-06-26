var express = require('express');
var router = express.Router();
var forecast = require('forecast');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var gcal = require('google-calendar');
var credentials = require('../config')
var atoken;

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('going to auth')
	res.redirect('/auth/google')
});

router.get('/success', function(req, res, next){
	console.log("calling router.get home page");
	res.render('index', { title: 'Bulletin' });
})

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
	});
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

/* Authenticate Google */
passport.use(new GoogleStrategy({
    clientID: credentials.googleCredentials.clientID,
    clientSecret: credentials.googleCredentials.clientSecret,
    callbackURL: credentials.googleCredentials.callbackURL,
	passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    atoken = accessToken
    return done(null, profile);
  }
));

/* Authentication redirects */
router.get('/auth/google',
  passport.authenticate('google', { scope:
    [ 'https://www.googleapis.com/auth/calendar.readonly', 'https://www.googleapis.com/auth/userinfo.profile']
}));

router.get('/auth/google/callback',
  passport.authenticate('google', { successRedirect: "/success", failureRedirect: '/auth/google'})
)

router.get('/calendar',function(req, res, next) {
	google_calendar = new gcal.GoogleCalendar(atoken)
	google_calendar.events.list('austintwu@gmail.com',
		{'timeMin': new Date().toISOString()},
		function(err, eventList){
			if(err){
				res.send(500, err);
			} else {
				res.json(eventList)
			}
		}
	)
	}
)

module.exports = router;
