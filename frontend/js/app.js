var insertMessage = function(message) {
	var messageEl = $('<li>' + message + '<li/>');
	$('#messages').append(messageEl);
}

$(document).ready(function() {
	var socket = io.connect("htpp://localhost:8080");

	socket.on('message', function(data) {
		insertMessage(data);
	})

	$('#send_message').submit(function(event){		
		event.preventDefault();
		var message = $('#message').val();
		socket.emit('messages', message);
		$('#message').val('');
	});
	var button = $('#send_button');
});
