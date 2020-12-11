module.exports = class Player {
  constructor(id, name) {
    this.id = id;
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