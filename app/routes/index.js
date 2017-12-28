'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req,res) {

	var obj = {};

	if (!req.isAuthenticated()) {
		obj.buttonOne = 'Log In';
		obj.buttonTwo = 'Register';
		res.render('index',obj);
	} else {
		obj.buttonOne = 'Profile';
		obj.buttonTwo = 'Log Out';
		res.render('index',obj);
	}
});

module.exports = router;