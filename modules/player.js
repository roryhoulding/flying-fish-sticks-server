module.exports = class Player {
  constructor(id, emoji, name) {
    this.id = id;
    this.emoji = emoji;
    this.name = name ? name : null;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getID() {
    return this.id;
  }

}