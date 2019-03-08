// #!/usr/bin/env node
const io = require('socket.io-client');
var socket = io.connect('http://localhost:8880');

socket.on('messages', function (data) {
    console.log(data);
    socket.emit('messages', { my: 'data' });
  });

socket.on('connect', function (socket2) {
    console.log('Connected!');
        socket.emit('messages', 'Connected');
});


