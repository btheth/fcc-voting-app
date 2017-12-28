'use strict';

var path = process.cwd();
var indexRouter = require(path + '/app/routes/index.js');
var profileRouter = require(path + '/app/routes/profile.js');
var loginRouter = require(path + '/app/routes/login.js');
var registerRouter = require(path + '/app/routes/register.js');
var pollRouter = require(path + '/app/routes/poll.js');
var pollNotFoundRouter = require(path + '/app/routes/pollnotfound.js');
var voteRouter = require(path + '/app/routes/vote.js');
var resultsRouter = require(path + '/app/routes/results.js');
var createRouter = require(path + '/app/routes/create.js');
var deleteRouter = require(path + '/app/routes/delete.js');
var pollSearchRouter = require(path + '/app/routes/pollsearch.js');

module.exports = function(app,passport) {
	app.set('view engine', 'pug');
	
	app.get('/', indexRouter);
	
	app.get('/login', isNotLoggedIn, loginRouter);
	app.post('/login', passport.authenticate('login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));
	
	app.get('/register', isNotLoggedIn, registerRouter);
	app.post('/register', passport.authenticate('register', {
		successRedirect: '/profile',
		failureRedirect: '/register',
		failureFlash: true
	}));
	
	app.get('/profile', isLoggedIn, profileRouter);
	
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
	app.get('/poll', pollRouter);
	app.get('/pollnotfound', pollNotFoundRouter);
	app.post('/vote', voteRouter);
	app.all('/vote', function(req,res) {
		res.redirect('/');	
	});
	app.get('/results', resultsRouter);
	
	app.all('/create', isLoggedIn, createRouter);
	app.delete('/delete', isLoggedIn, deleteRouter);
	app.get('/polldeleted',isLoggedIn, function(req,res) {
		res.status(304).redirect('/profile');
	});
	app.get('/pollsearch', pollSearchRouter);

	app.use(function(res,req) {
		req.status(404).end("Page Not Found");
	});
};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/login');
}

function isNotLoggedIn(req, res, next) {
	if (!req.isAuthenticated())
		return next();
	res.redirect('/profile');
}