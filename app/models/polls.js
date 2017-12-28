'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
	id: Object,
	pollName: String,
	userId: Object,
	active: Boolean,
	options: [{
		optionName: String,
		optionVotes: Number
	}],
	totalVotes: Number,
	timestamp: Date
});

module.exports = mongoose.model('polls', Poll);