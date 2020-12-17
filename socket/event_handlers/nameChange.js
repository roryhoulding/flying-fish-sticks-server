// Data
const activeRooms = require('../activeRooms');

exports.nameChange = (socket, name) => {
    const gameRoom = activeRooms[socket.gameRoom];
    const player = gameRoom.getPlayer(socket.id);
    player.setName(name);
    gameRoom.updateClients();
}

