const socketController = require('./controllers/socketIO');

module.exports = (socket) => {

  socket.on('createNewGameRoom', () => {
    socketController.createNewGameRoom(socket)
  });

}