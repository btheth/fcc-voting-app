'use strict';

var express = require('express');
var router = express.Router();
var Polls = require('../models/polls');

router.post('/vote', function(req,res) {
    console.log('vote');
    console.log(req.url);
    var pollName = req.url.split('!end')[0];
    pollName = decodeURI(pollName.substring(pollName.indexOf('?')+1));
    console.log(pollName);
    pollName = pollName.split('=')[1];
    console.log(pollName);
    var option = "";
    var type = "";

    if (req.body.option === 'custom') {
        option = req.body.custom;
        type = 'new';
    } else {
        option = req.body.option;
        type = 'existing';
    }
        
    if (type === 'existing') {
        var conditionsEx = { 'pollName': pollName, 'options.optionName': option }
        , updateEx = { $inc: { 'options.$.optionVotes': 1 , 'totalVotes': 1}};

        Polls.update(conditionsEx, updateEx, function(err, num) {
            if (err) throw err;
            res.status(304).redirect('/results?' + pollName + '!end');
        });
    } else {
        var newOptArr = {
          optionName: option,
          optionVotes: 1
        };
            
        var conditionsNew = { 'pollName': pollName }
        , updateNew = { $push: {'options': newOptArr}, $inc: {'totalVotes': 1}};
            
        Polls.update(conditionsNew,updateNew,function(err, num) {
            if (err) throw err;
            res.status(304).redirect('/results?' + pollName + '!end');
        });
    }
});

module.exports = router;