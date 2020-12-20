const startingTexts = require('../data/startingTexts');
const getRandomInt = require('../modules/getRandomInt');
const EventEmitter = require('events');

module.exports = class Game extends EventEmitter {
  constructor(players) {
    super();

    // Constants
    this.ROUND_DURATION = 10;
    
    // Variables
    this.currentRound = {
      number: 0,
      timeLeft: 0,
      data: {},
      lastRound: false,
      playersReady: [],
    };

    this.players = players;
    this.sets = [];
    this.started = false;
  }
  
  init() {
    this.started = true;

    const numPlayers = this.players.length;

    // Generate the first round for each set
    for (let i = 0; i < numPlayers; i++) {
      const randomInt = getRandomInt(0, startingTexts.length - 1);
      const startData = startingTexts[randomInt];
      this.sets.push({
        type: 'text',
        data: startData,
      })
    }

    // Set up the first round
    this.setNextRound()
  }

  setNextRound() {
    // Set round data
    this.currentRound = {
      number: this.currentRound.number += 1,
      timeLeft: this.ROUND_DURATION,
      data: {},
      lastRound: this.currentRound.lastRound,
      playersReady: [],
    }

    // If this is the last round, set lastRound to be true
    if (this.currentRound.number === this.players.length) {
      this.currentRound.lastRound = true;
      console.log('last round');
    }
  }

  setPlayerReady(player) {
    const { playersReady } = this.currentRound;
    playersReady.push(player);
  }

  startRound() {
    // Start the countdown and the round begins
    const interval = setInterval(() => {
      this.currentRound.timeLeft--;
      this.emit('timeLeftChange', this.currentRound.timeLeft);
      if (this.currentRound.timeLeft === 0) {
        clearInterval(interval);
        // this.endRound();
        console.log('End of timer');
      }
    }, 1000);
  }

}