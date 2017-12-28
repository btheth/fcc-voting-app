$(document).ready(function() {

	function linkButtons() {
		if ($('#b1').text() === "Log In") {
			$('#b1').attr('href', '/login');
			$('#b2').attr('href', '/register');
		} else {
			$('#b1').attr('href', '/profile');
			$('#b2').attr('href', '/logout');
		}

	}

	linkButtons();

});