$(document).ready(function() {
	var appUrl = window.location.origin;
	var poll = $("#poll").text();
	var getPollUrl = appUrl + '/pollsearch?poll=' + poll;
	
	window.validateForm = function() {
	    if ($('input[type=radio]:checked').length === 0) {
	        alert("Must select an option");
	        return false;
	    } else if ($('#custom-val').is(':checked') && !$('#custom-text').val()) {
	        alert("Must enter custom answer");
	        return false;
	    } else if ($('#custom-val').is(':checked')) {
	        if ($('input[name=\'option\']').val() === $('#custom-text').val()) {
	            alert("Answer already exists");
	            return false;
	        }
	    }
	    return true;
    };

	$('#new-opt').on('click', function() {
		var values = [];
		
		$('input[name="option"]').each(function() {
    		values.push($(this).val());
		});
		
		console.log(values);
		
		var html = $('#option-group').html();
		html += '<input class=\'form-control\' type=\'text\' name=\'option\' placeholder=\'new option\'>';
		$('#option-group').html(html);
		
		var i = 0;
		$('input[name="option"]').each(function() {
    		$(this).val(values[i]);
    		i++;
		});
		
	});
});