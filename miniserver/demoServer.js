var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8880);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('messages', { hello: 'world' });
  socket.on('messages', function (data) {
    console.log(data);
  });
});