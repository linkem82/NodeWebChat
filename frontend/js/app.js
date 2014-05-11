$(document).ready(function() {
	var server = io.connect("htpp://localhost:8080");


	$('#send_button').submit(function(event){		
		alert("Ciao");
		event.preventDefault();
		var message = $('#message').val();
		socket.emit('messages', message);
	});
	var button = $('#send_button');
});
