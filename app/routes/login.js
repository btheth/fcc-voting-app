'use strict';

var express = require('express');
var router = express.Router();

router.get('/login', function(req,res) {

	var obj = {
		buttonOne: 'Log In',
		buttonTwo: 'Register',
		message: req.flash('message')
	};
	
	res.render('login',obj);
});

module.exports = router;