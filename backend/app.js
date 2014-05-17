var express = require('express');
var http = require('http');
var socket = require('socket.io');
var path = require('path');
var redis = require('redis'); 
var os=require('os');

var app = express();
var server = http.createServer(app);
var io = socket.listen(server);
server.listen(8080);

var ifaces=os.networkInterfaces();
var server_address;

for (var dev in ifaces) {
  var alias = 0;
  ifaces['Wireless Network Connection'].forEach(function(details){
    if (details.family=='IPv4') {
      server_address = details.address;    
    }
  });
}
console.log(server_address);

app.use(express.static(path.resolve('../frontend')));

var redisClient = redis.createClient();
 
var addMessage = function(name, data) {
	var message = JSON.stringify({name: name, data: data});
	redisClient.lpush("messages", message, function(err, response) {
		redisClient.ltrim("messages", 0, 10);
	});
}

io.sockets.on("connection", function(client) {		
	client.on("join", function(name) {		
		client.set("nickname", name);
		redisClient.lrange("messages", 0, -1, function(err, messages) {
			messages = messages.reverse();
			messages.forEach(function(message) {
				message = JSON.parse(message);
				client.emit("message", message.name + ": " + message.data);
			});
		});
		console.log("Client " + name + " connected...");
	})
	client.on('messages', function(message) {
		client.get("nickname", function(err, nickname) {
			addMessage(nickname, message);
			console.log(nickname + ": " + message);
			client.broadcast.emit("message", nickname + ": " + message);
		})		
	});
});

app.get("/", function(req, res) {
	res.sendfile(path.resolve("../frontend/index.html"));
});


