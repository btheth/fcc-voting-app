$(document).ready(function() {
	var appUrl = window.location.origin;
	var poll = $("#poll").text();
	var getPollUrl = appUrl + '/pollsearch?poll=' + poll + '!end';
	
	window.validateForm = function() {
	    if ($('input[type=radio]:checked').length === 0) {
	        alert("Must select an option");
	        return false;
	    } else if ($('#custom-val').is(':checked') && !$('#custom-text').val()) {
	        alert("Must enter custom answer");
	        return false;
	    } else if ($('#custom-val').is(':checked')) {
	        var found = false
	        $('input:radio').each(function() {
				if($(this).val() === $('#custom-text').val()) {
    				found = true;
				}
			});
			if (found) {
				alert("Must enter unique value");
				return false;
			}
		}
	    return true;
    };

	function getPoll() {
		$.getJSON(getPollUrl, function(json) {
		    var voteUrl = 'vote?poll=' + encodeURI(poll) + '!end';
			var html = '<h2>Options:</h2><form id=\'option-form\' align=\'center\' onsubmit=\'return validateForm();\' action=' + voteUrl + ' method=\'post\'>';
			var results = json.polls;

			for (var i = 0; i < results.options.length; i++) {
				var option = results.options[i].optionName;
				html += '<label align=\'left\' class=\'custom-control custom-radio poll-option\'>';
				html += '<input class=\'custom-control-input rad-btn\' align=\'left\' type=\'radio\' name=\'option\' value=\'' + option + '\'>';
				html += '<span align=\'left\' class=\'custom-control-indicator rad-btn\'></span>';
                html += '<span align=\'left\' class=\'custom-control-description opt\'> ' + option + '</span>';
				html += '</label></br>';
			}
            
            html += '<label align=\'left\' class=\'custom-control custom-radio poll-option\'>';
			html += '<input id=\'custom-val\' align=\'left\' class=\'custom-control-input rad-btn\' type=\'radio\' name=\'option\' value=\'custom\'>';
			html += '<span align=\'left\' class=\'custom-control-indicator rad-btn\'></span>';
            html += '<span align=\'left\' class=\'custom-control-description opt\'> <input id=\'custom-text\' type=\'text\' placeholder=\'custom option\' name=\'custom\'></span>';
			html += '</label></br></br>';
			html += '<button id=\'vote-btn\' align=\'center\' class=\'btn btn-warning btn-lg\' type=\'submit\'>Vote</button>';
			html += '</form>';
			html += '</br><a class=\'btn btn-info\' href=/results?' + encodeURI(poll) + '!end>See Results</a>';
			$('#option-table-div').html(html);
		});
	}

	getPoll();
});