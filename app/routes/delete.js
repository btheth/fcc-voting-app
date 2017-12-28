'use strict';

var express = require('express');
var router = express.Router();
var Polls = require('../models/polls');
var Users = require('../models/users');

router.delete('/delete', function(req,res) {
	var poll = req.body.poll;
	
	Polls.find({ 'pollName':poll }).remove().exec(function(err, results) {
		if (err) throw err;
		
		var conditions = { 'username': req.user.username }
    	, update = { $pull: {'polls': {'pollName': poll} }};
            
    	Users.update(conditions,update,function(err, num) {
    		if (err) throw err;
    		res.status(200).json({status:'delete successful'});
    	});
		
	});
});

module.exports = router;