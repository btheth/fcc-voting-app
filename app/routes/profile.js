'use strict';

var express = require('express');
var router = express.Router();

router.get('/profile', function(req,res) {

	var obj = {
		name: req.user.username,
		buttonOne: 'Profile',
		buttonTwo: 'Log Out'
	};

	res.render('profile',obj);
});

module.exports = router;