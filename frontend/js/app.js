var insertInList = function(name, message, styleClass) {
	var el = $('<li>' + message + '</li>');
	el.addClass(styleClass);
	$("#" + name).append(el);
}

var moveScrollbarDown = function() {
	$('body').scrollTop($(document).height());
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
		insertInList("messages", data, "sender");
		moveScrollbarDown();		
	});

	$('#send_message').submit(function(event){		
		event.preventDefault();
		var message = $('#message').val();
		socket.emit('messages', message);
		insertInList("messages", "Io: " + message, "receiver");
		moveScrollbarDown();
		$('#message').val('');
	});
	
});
