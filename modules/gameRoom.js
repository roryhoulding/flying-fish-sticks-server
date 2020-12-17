const Game = require('../modules/game');
const findObjectInArray = require('../modules/findObjectInArray');
const grabItem = require('../modules/grabItem');
const emojiData = require('../data/emojiData');

module.exports = class GameRoom {
  constructor(roomCode, io) {
    // Inherit from parent class
    
    // Constants
    this.ROOM_CODE = roomCode;

    // Classes are passed an object as a reference 
    // This will not create a new instance of io every 
    // time a new game is created
    this.io = io;
    this.availableEmojis = emojiData;
    
    // Variables
    this.players = [];
    this.status = 'waiting-room'; // waiting-room or in-a-game or starting-game
    this.currentGame = null;
  }

  // Player methods
  test() {
    this.io.emit('test')
  }

  setPlayer(player) {
    this.players.push(player);
  }

  deletePlayer(id) {
    // Find the player index in the players array
    const playerIndex = findObjectInArray('id', id, this.players);

    // Delete the player at playerIndex from players
    this.players.splice(playerIndex, 1)
  }

  getPlayer(id) {
    const playerIndex = findObjectInArray('id', id, this.players);

    // Delete the player at playerIndex from players
    return this.players[playerIndex];
  }
  
  getPlayers() {
    return this.players;
  }

  getRoomCode() {
    return this.ROOM_CODE;
  }

  updateClients() {
    const {io, ...data} = this;
    this.io.to(this.ROOM_CODE).emit('roomUpdate', data);
  }

  createNewGame() {
    // hide the start game button so nobody else can click it
    // maybe send all players to loading screen?
    if (this.currentGame && this.currentGame.started) {
      console.log('The game has already begun');
      return;
    }
    this.currentGame = new Game(this.players);
    this.currentGame.init();
  }
  
  startGame() {
    if (this.status === 'in-a-game') return;
    this.status = 'in-a-game';
    this.currentGame.start();
  }

  getEmoji() { 
    return grabItem(this.availableEmojis);
  }

  // nextRound() {
  //   // Incrememnt round and reset the currentRound variable
  //   this.currentRound = {
  //     number: this.currentRound.number += 1,
  //     timeLeft: this.ROUND_DURATION,
  //     data: {},
  //     lastRound: this.currentRound.lastRound,
  //   }
  //   console.log(`Round ${this.currentRound.number}`);

  //   // Rounds go from 1 to player.length
  //   // If the round number === player length, this means
  //   // it is the last round
  //   // lastRound is used to end the game later
  //   if (this.currentRound.number === this.players.length) {
  //     this.currentRound.lastRound = true;
  //     console.log('last round');
  //   }

  //   // Send new round event out
  //   // Will be caught and used to send newRound and the data
  //   // out to the clients
  //   // Send the correct data to each player
  //   const data = this.sets.map(set => set[this.currentRound.number - 1]);
  //   for (let set of data) {
  //     this.io.to(set.playerID).emit('newRound', {
  //       round: this.currentRound.number,
  //       data: set,
  //     })
  //   }
  //   // }
  //   // this.emit('newRound', {
  //   //   round: this.currentRound.number,
  //   //   data: this.sets.map(set => set[this.currentRound.number - 1]),
  //   // });

  //   // Probably need to get confirmation that 
  //   // everybody is ready before doing this
  //   // Have a timeout of 30 seconds for people to connect
  //   this.currentRound.timeLeft = this.ROUND_DURATION;
  //   this.currentRound.timer = this.startTimer();
  // }

  // endGame() {
  //   for (let set of this.sets) {
  //     this.io.to(set[0].playerID).emit('results', set);
  //   }
  // }

  
  // endRound() {
  //   // Emitting end round will trigger socket.io to emit
  //   // endRound to all sockets
  //   // which will collect the data from each socket and
  //   // trigger appendRoundData as below
  //   console.log('End of round');
  //   this.io.to(this.roomCode).emit('endRound');
  // }
  
  // startTimer() {
  //   return setInterval(() => {
  //     this.io.to(this.roomCode).emit('timeChange', this.currentRound.timeLeft)
  //     this.currentRound.timeLeft--;
  //     if (this.currentRound.timeLeft < 0) {
  //       clearInterval(this.currentRound.timer);
  //       this.endRound();
  //     }
  //   }, 1000);
  // }

  // appendRoundData({playerID, data}) {
  //   this.currentRound.data[playerID] = data;
  //   // If the amount of round data = the number of players
  //   // That means we have the data for each player from that round
  //   if (this.allRoundDataCollected()) {
  //     this.updateSets();
  //   }
  // }

  // updateSets() {
  //   // Iterate over all sets
  //   for (let set of this.sets) {
  //     const playerID = set[this.currentRound.number - 1].playerID;
  //     const roundIndex = this.currentRound.number - 1;
  //     const outputData = this.currentRound.data[playerID];
  //     // Set the this sets round ouput data as the data
  //     // that the player wrote or drew
  //     set[roundIndex].outputData = outputData;
  //     // Set the this sets next round input data as the data
  //     // that the player wrote or drew
  //     if (!this.currentRound.lastRound) {
  //       set[roundIndex + 1].inputData = outputData;
  //     }
  //   }
  //   if (!this.currentRound.lastRound) {
  //     this.nextRound();
  //   } else {
  //     this.endGame();
  //   }
  // }

  // allRoundDataCollected() {
  //   if ((Object.keys(this.currentRound.data).length) === this.players.length) {
  //     return true;
  //   }
  //   return false;
  // }

  // test() {
  //   this.io.sockets.emit('test')
  // }


}