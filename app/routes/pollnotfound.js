'use strict';

var express = require('express');
var router = express.Router();

router.get('/pollnotfound', function(req,res) {

	var obj = {};

	if (!req.isAuthenticated()) {
		obj.buttonOne = 'Log In';
		obj.buttonTwo = 'Register';
		res.render('pollnotfound',obj);
	} else {
		obj.buttonOne = 'Profile';
		obj.buttonTwo = 'Log Out';
		res.render('pollnotfound',obj);
	}
});

module.exports = router;