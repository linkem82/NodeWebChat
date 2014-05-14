var insertMessage = function(message, styleClass) {
	var messageEl = $('<li>' + message + '</li>');
	messageEl.addClass(styleClass);
	$('#messages').append(messageEl);
}

$(document).ready(function() {

	var server_url = $(location).attr('href');;
	var socket = io.connect(server_url);
	var nickname;

	socket.on("connect", function() {
		$("#status").html("Status: connected");
		nickname = prompt("Insert your nickname");
		socket.emit("join", nickname);
	});

	socket.on('message', function(data) {
		insertMessage(data, "sender");
		$('body').scrollTop($(document).height());		
	});

	$('#send_message').submit(function(event){		
		event.preventDefault();
		var message = $('#message').val();
		socket.emit('messages', message);
		insertMessage("Io: " + message, "receiver");
		$('#message').val('');
	});
	
});
