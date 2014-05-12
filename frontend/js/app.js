var insertMessage = function(message) {
	var messageEl = $('<li>' + message + '<li/>');
	$('#messages').append(messageEl);
}

$(document).ready(function() {

	var server_url = $(location).attr('href');;
	var socket = io.connect(server_url);

	socket.on('message', function(data) {
		insertMessage(data);
		$('body').scrollTop($(document).height());
		//alert($('body').scrollTop());
	});


	$('#send_message').submit(function(event){		
		event.preventDefault();
		var message = $('#message').val();
		socket.emit('messages', message);
		$('#message').val('');
	});
	var button = $('#send_button');
});
