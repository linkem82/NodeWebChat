var express = require('express');
var http = require('http');
var socket = require('socket.io');
var path = require('path');

var app = express();
var server = http.createServer(app);
var io = socket.listen(server);
server.listen(8080);

var os=require('os');
var ifaces=os.networkInterfaces();
var server_address;

for (var dev in ifaces) {
  var alias=0;
  ifaces['Wireless Network Connection'].forEach(function(details){
    if (details.family=='IPv4') {
      server_address = details.address;    
    }
  });
}
console.log(server_address);

app.use(express.static(path.resolve('../frontend')));

io.sockets.on("connection", function(client) {
	console.log("Client connected...");	
	client.on('messages', function(data) {
		console.log(data);
		client.broadcast.emit('message', data);
	});
});

app.get("/", function(req, res) {
	res.sendfile(path.resolve("../frontend/index.html"));
});


