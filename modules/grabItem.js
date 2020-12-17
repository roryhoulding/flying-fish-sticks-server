// Removes and returns the value of a random item from an array
// Does not remove the item if it is the only item in the array

const getRandomInt = require('../modules/getRandomInt');

module.exports = (arr) => {
  // Do not delete item if the only item in array
  if (arr.length === 1) return arr[0];

  // Generate random index for the item to grab
  const randomIndex = getRandomInt(0, arr.length - 1);

  // Remove and return using splice
  return arr.splice(randomIndex, 1)[0];
}