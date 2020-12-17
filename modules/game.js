const startingTexts = require('../data/startingTexts');
const getRandomInt = require('../modules/getRandomInt');

const { set } = require("../app");

module.exports = class Game {
  constructor(players) {
    // Constants
    this.ROUND_DURATION = 10;
    
    // Variables
    this.currentRound = {
      number: 0,
      timeLeft: 0,
      data: {},
      lastRound: false,
    };
    this.players = players;
    this.sets = [];
    this.started = false;
  }

  start() {
    if (this.started) return;
    this.started = true;
  }
  
  init() {
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
  }

  nextRound() {
    this.currentRound = {
      number: this.currentRound.number += 1,
      timeLeft: this.ROUND_DURATION,
      data: {},
      lastRound: this.currentRound.lastRound,
    }

    console.log(`Round ${this.currentRound.number}`);

    if (this.currentRound.number === this.players.length) {
      this.currentRound.lastRound = true;
      console.log('last round');
    }
  }
}