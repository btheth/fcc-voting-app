'use strict';

var express = require('express');
var router = express.Router();
var Polls = require('../models/polls');
var Users = require('../models/users');

router.get('/poll', function(req,res) {
    var query = req.url.split('!end')[0];
    query = ['',query.substring(query.indexOf('?')+1)];
    console.log(query);
    	var obj = {
            name: decodeURI(query[1])  
	    };

	if (!req.isAuthenticated()) {
		obj.buttonOne = 'Log In';
		obj.buttonTwo = 'Register';
	} else {
		obj.buttonOne = 'Profile';
		obj.buttonTwo = 'Log Out';
	}

	if (query.length === 2) {
		Polls.findOne({'active': true, 'pollName': decodeURI(query[1])}).exec(function(err,pollResult) {
			if (err) throw err;
			if (pollResult) {
			    var userId = pollResult.userId;
			    Users.findOne({'_id': userId}).exec(function(err,userResult) {
			        if (err) throw err;
			        obj.user = userResult.username;
			        res.status(200).render('poll',obj);
			    });
			} else {
			    res.status(304).redirect('/pollnotfound');
			}
		});
	} else {
	    res.status(304).redirect('/pollnotfound');
	}
});

module.exports = router;