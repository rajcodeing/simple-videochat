const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
  console.log('Connected:', socket.id);

  socket.on('admin-signal', data => {
    socket.broadcast.emit('admin-signal', data);
  });

  socket.on('user-signal', data => {
    socket.broadcast.emit('user-signal', data);
  });

  socket.on('admin-stop', () => {
    socket.broadcast.emit('admin-stop');
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnect');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
