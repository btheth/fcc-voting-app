$(document).ready(function() {
	var appUrl = window.location.origin
	var user = $("#user").text();
	var getPollsUrl = appUrl + '/pollsearch?user=' + user;

	jQuery.each( [ "put", "delete" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {
    		if ( jQuery.isFunction( data ) ) {
    			type = type || callback;
    			callback = data;
    			data = undefined;
    		}

    		return jQuery.ajax({
    			url: url,
    			type: method,
    			dataType: type,
    			data: data,
    			success: callback
    		});
		};
	});

	function getUserPolls() {
		$.getJSON(getPollsUrl, function(json) {
			var html = $('#poll-table-div').html();
			html += '<table id=\'poll-table\'><tr><th>Your Recent Polls</th><th>Votes</th><th></th></tr>';
			var results = json.polls;

			for (var i = 0; i < results.length; i++) {
				var pollName = results[i].pollName;
				var votes = results[i].totalVotes;
				html += '<tr><td class=\'poll-name\'><a href=\'/results?' + pollName + '!end\'>' + pollName + '</a></td>'
				html += '<td class=\'votes\'>' + votes + '</td>';
				html += '<td><button class=\'btn btn-danger delete\' value=\'' + pollName + '\'>Delete</button></td></tr>';
			}

			html += '</table>';
			$('#poll-table-div').html(html);
		});
	}

	getUserPolls();
	
	$('#poll-table-div').on('click', '.delete', function() {
		var answer = confirm('Really delete poll \'' + $(this).val() + '\'?');
		
		if (answer) {
			$.delete('/delete', {poll:$(this).val()}, function(result){
				window.location.href = appUrl + '/polldeleted';
			});
		} else {
			//nothing...go back to profile
		}
		
	});
});