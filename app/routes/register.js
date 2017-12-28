'use strict';

var express = require('express');
var router = express.Router();

router.get('/register', function(req,res) {

	var obj = {
		buttonOne: 'Log In',
		buttonTwo: 'Register',
		message: req.flash('message')
	};
	
	res.render('register',obj);
});

module.exports = router;