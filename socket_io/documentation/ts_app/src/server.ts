import { Server } from 'socket.io';

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>();

io.on('connection', (socket) => {
  socket.emit('noArg');
  socket.emit('basicEmit', 1, '2', Buffer.from([3]));
  socket.emit('withAck', '4', (e) => {
    // e is inferred as number
  });

  // works when broadcast to all
  io.emit('noArg');

  // works when broadcasting to a room
  io.to('room1').emit('basicEmit', 1, '2', Buffer.from([3]));
});

io.on('connection', (socket) => {
  socket.on('hello', () => {
    // ...
  });
});

io.serverSideEmit('ping');

io.on('ping', () => {
  // ...
});

io.on('connection', (socket) => {
  socket.data.name = 'john';
  socket.data.age = 42;
});
