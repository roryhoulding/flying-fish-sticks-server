const socket = require('socket.io');
const socketEventRouter = require('../socket/event_router')

let io = null;

exports.init = (server) => {
  io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', socket => {
    socketEventRouter(socket, io);
  });

  return;
};
