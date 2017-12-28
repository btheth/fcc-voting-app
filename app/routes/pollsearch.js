'use strict';

var express = require('express');
var router = express.Router();
var Polls = require('../models/polls');
var Users = require('../models/users');
var pollLimit = 50;

function verifyParams(query) {
	var arr = query.split('&');
	if (arr[0].split('=')[0] === 'user' && arr[1].split('=')[0] === 'query') {
		return true;
	} else if (arr[1].split('=')[0] === 'user' && arr[0].split('=')[0] === 'query') {
		return true;
	} else {
		return false;
	}
}

function getUser(query) {
	var arr = query.split('&');
	if (arr[0].split('=')[0] === 'user') {
		return arr[0].split('=')[1];
	} else {
		return arr[1].split('=')[1];
	}
}

function getQuery(query) {
	var arr = query.split('&');
	if (arr[0].split('=')[0] === 'query') {
		return arr[0].split('=')[1];
	} else {
		return arr[1].split('=')[1];
	}
}

function getPoll(query) {
	var arr = query.split('&');
	return arr[0].split('=')[1];
}

router.get('/pollsearch', function(req,res) {
	var query = req.url.split('!end')[0];
	if (query === '/pollsearch') {
		query = [' '];
	} else {
		query = ['',query.substring(query.indexOf('?')+1)];
	}
    
    console.log(query);

	if (query.length === 1) {
		Polls.find({}).sort({'timestamp': -1}).limit(pollLimit).exec(function(err,result) {
			if (err) throw err;
			res.status(200).json({polls: result});
		});
	} else if (query[1].split('&').length > 2 
		|| query[1].split('&').length < 1) {
		//query must have one or two params
		res.status(405).json({error: 'invalid api use: max 2 params', query: query[1]});
	} else if (query[1].split('&').length === 1) {
		//if one param, must be 'user', 'query', or ''

		if (query[1].split('&')[0].split('=')[0] === 'user') {
			var user = getUser(query[1]);
			Users.findOne({'username': user}).exec(function(err,userResult) {
				//console.log(userResult);
				if (err) throw err;
				if (!userResult) {
					res.status(405).json({error: 'user not found'});
				}
				var userId = userResult._id;
				//console.log(userResult._id);
				//console.log(typeof userResult._id);
				Polls.find({'userId': userId}).sort({'timestamp': -1}).limit(pollLimit).exec(function(err,result) {
					if (err) throw err;
					res.status(200).json({polls: result});
				});
			});

		} else if (query[1].split('&')[0].split('=')[0] === 'query') {
			var q = getQuery(query[1]);
			//implement query only search
			res.status(200).json({results:'query only search not yet implemented'});
		} else if (query[1].split('&')[0].split('=')[0] === 'poll') {
			//implement poll search
			var poll = getPoll(decodeURI(query[1]));
			Polls.findOne({'pollName': poll}).exec(function(err,result) {
				if (err) throw err;
				res.status(200).json({polls: result});
			});
		} else {
			res.status(405).json({error: 'invalid api use: param must be user, query, or none', query: query[1]});
		}
	} else {
		//we can assume there are two params
		query = query[1];
		if (!verifyParams(query)) {
			//if they aren't user and query, error out
			res.status(405).json({error: 'invalid api use: params must be user and query'});
		} else {
			//implement two param search
			var user = getUser(query);
			var q = getQuery(query);
			res.json({results: 'two param search not yet implemented'});
		}
	}
});

router.use(function(req,res) {
	res.status(404).json({error: 'invalid api use: page not found'});
});

module.exports = router;