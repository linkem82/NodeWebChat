var server = io.connect("htpp://localhost:8080");

$('#send_message').submit(function(e){
	var message = $('#message').val();
	socket.emit('messages', message);
});
