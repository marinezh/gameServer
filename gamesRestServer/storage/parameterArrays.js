"use strict";

//insert into game (number, name, quantity, year, genre)
const toInsertArray = (game) => [
  +game.number,
  game.name,
  +game.quantity,
  +game.year,
  game.genre,
];

//update game set name=?, quantity=?, year=?, genre=?",
// "where number=?"

const toUpdateArray = (game) => [
  game.name,
  +game.quantity,
  +game.year,
  game.genre,
  +game.number,
];

module.exports = { toInsertArray, toUpdateArray };
