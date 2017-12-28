$(document).ready(function() {
	var appUrl = window.location.origin
	var getAllUrl = appUrl + '/pollsearch?';

	function getAllPolls() {
		$.getJSON(getAllUrl, function(json) {
			var html = $('#poll-table-div').html();
			html += '<table id=\'poll-table\'><tr><th>Recent Polls</th><th>Votes</th></tr>';
			var results = json.polls;

			for (var i = 0; i < results.length; i++) {
				var pollName = results[i].pollName;
				var votes = results[i].totalVotes;
				html += '<tr><td class=\'poll-name\'><a href=\'/poll?' + pollName + '!end\'>' + pollName + '</a></td>';
				html += '<td class=\'votes\'>' + votes + '</td></tr>';
			}

			html += '</table>';
			$('#poll-table-div').html(html);
		});
	}

	getAllPolls();

});