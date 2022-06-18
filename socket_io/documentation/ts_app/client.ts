import { io, Socket } from 'socket.io-client';

// please note that the types are reversed
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();
socket.emit('hello');

socket.on('noArg', () => {
  // ...
});

socket.on('basicEmit', (a, b, c) => {
  // a is inferred as number, b as string and c as buffer
});

socket.on('withAck', (d, callback) => {
  // d is inferred as string and callback as a function that takes a number as argument
});
