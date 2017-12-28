'use strict';

var express = require('express');
var router = express.Router();
var Polls = require('../models/polls');
var Users = require('../models/users');

router.get('/create', function(req,res) {
	var obj = {
		user: req.user.username,
		buttonOne: 'Profile',
		buttonTwo: 'Log Out',
		message: req.flash('message')
	};
    
    res.status(200).render('create',obj);
});

function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}

router.post('/create', function(req,res) {
	
	var pollname = req.body.pollname;
	var options = req.body.option;
	
	if (pollname === "") {
		req.flash('message', 'Must enter poll name');
		res.status(304).redirect('/create');
	} else {
		
		for (var i = 0; i < options.length; i++) {
			if (options[i] === "") {
				options.splice(i,1);
				i--;
			}
		}
		
		if (options.length < 2) {
			req.flash('message', 'Poll must have at least two options');
			res.status(304).redirect('/create');
		} else if (hasDuplicates(options)) {
			req.flash('message', 'Options must be unique');
			res.status(304).redirect('/create');
		} else {
			Polls.findOne({'pollName': pollname}).exec(function(err,result) {
				if (err) throw err;
		
				if (result) {
					req.flash('message', 'Poll name already exists');
					res.status(304).redirect('/create');
				} else {
					var optArr = [];

					for (var j = 0; j < options.length; j++) {
						optArr.push({optionName: options[j], optionVotes: 0});
					}
		
					Users.findOne({username: req.user.username}).exec(function(err,userResult) {
						if (err) throw err;
			
						var userid = userResult._id;
						var obj = {
							pollName: pollname,
							userId: userid,
							active: true,
							options: optArr,
							totalVotes: 0,
							timestamp: new Date()	
						};
			
						var poll = new Polls(obj);
				
						poll.save(function (err, poll) {
							if (err) throw err;
				
							var pollObj = {pollName: poll.pollName, pollId: poll._id};
				
							var conditionsNew = { username: req.user.username }
        					, updateNew = { $push: {'polls': pollObj}};
            
        					Users.update(conditionsNew,updateNew,function(err, num) {
            					if (err) throw err;
            					
            					var pollLink = process.env.APP_URL + 'poll?' + encodeURI(poll.pollName) + "!end";
            					
            					var obj = {
            						link: pollLink,
            						buttonOne: 'Profile',
									buttonTwo: 'Log Out'
            					};

            					res.status(200).render('pollcreated', obj);
        					});
						});
			
					});
				} 
			});
		}
	}
});

module.exports = router;