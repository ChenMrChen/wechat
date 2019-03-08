var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8880);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log("connect comming from client: " + socket.id);
  socket.emit('messages_jerry', { hello: 'world greeting from Server!' });
  socket.on('messages', function (data) {
    console.log("data received from Client:" + JSON.stringify(data,2,2));
  });
});