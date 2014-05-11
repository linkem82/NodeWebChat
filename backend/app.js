var express = require('express');
var http = require('http');
var socket = require('socket.io');
var path = require('path');

var app = express();
var server = http.createServer(app);
var io = socket.listen(server);

server.listen(8080);

app.use(express.static(path.resolve('../frontend')));

io.sockets.on("connection", function(client) {
	console.log("Client connected...");	
	client.on('messages', function(data) {
		console.log(data);
	});
});

app.get("/", function(req, res) {
	res.sendfile(path.resolve("../frontend/index.html"));
});


