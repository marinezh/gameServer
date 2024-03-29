"use strict";

const CODES = {
  PROGRAM_ERROR: 0,
  NOT_FOUND: 1,
  INSERT_OK: 2,
  NOT_INSERTED: 3,
  UPDATE_OK: 4,
  NOT_UPDATED: 5,
  REMOVE_OK: 6,
  NOT_REMOVED: 7,
  number_NO_NOT_MATCH: 8,
};

const MESSAGES = {
  PROGRAM_ERROR: () => ({
    message: "Sorry! Error in our program",
    code: CODES.PROGRAM_ERROR,
    type: "error",
  }),
  NOT_FOUND: (number, value) => ({
    message: `No resource found with ${number} ${value}`,
    code: CODES.NOT_FOUND,
    type: "info",
  }),
  INSERT_OK: (number, value) => ({
    message: `Resource with number ${number} ${value} was inserted`,
    code: CODES.INSERT_OK,
    type: "info",
  }),
  NOT_INSERTED: () => ({
    message: "Resource was not inserted.",
    code: CODES.NOT_INSERTED,
    type: "error",
  }),
  UPDATE_OK: (number, value) => ({
    message: `Resource with number ${number} ${value} was updated`,
    code: CODES.UPDATE_OK,
    type: "info",
  }),
  NOT_UPDATED: () => ({
    message: "Data was not updated",
    code: CODES.NOT_UPDATED,
    type: "error",
  }),
  REMOVE_OK: (number, value) => ({
    message: `Resource with number ${number} ${value} was removed`,
    code: CODES.REMOVE_OK,
    type: "info",
  }),
  NOT_REMOVED: (number, value) => ({
    message: `No resource found with ${number} ${value}. Nothing removed`,
    code: CODES.NOT_REMOVED,
    type: "error",
  }),
  number_NO_NOT_MATCH: (number, numberInResource) => ({
    message:
      `The number ${number} of given resource doesn't ` +
      `match the given number ${numberInResource}`,
    code: CODES.number_NO_NOT_MATCH,
    type: "error",
  }),
};

module.exports = { CODES, MESSAGES };
