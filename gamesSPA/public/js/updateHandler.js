"use strict";

(function () {
  let numberField, nameField, quantityField, yearField, genreField, messagearea;
  let searchState = true;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    numberField = document.getElementById("number");
    nameField = document.getElementById("name");
    quantityField = document.getElementById("quantity");
    yearField = document.getElementById("year");
    genreField = document.getElementById("genre");
    messagearea = document.getElementById("messagearea");

    updateFields();

    document.getElementById("submit").addEventListener("click", send);

    numberField.addEventListener("focus", clearAll);
  }

  function updateMessage(message, type) {
    messagearea.textContent = message;
    messagearea.setAttribute("class", type);
  }

  function clearMessage() {
    messagearea.textContent = "";
    messagearea.removeAttribute("class");
  }

  function clearAll() {
    if (searchState) {
      clearFieldValues();
      clearMessage();
    }
  }

  function updateFields() {
    if (searchState) {
      numberField.removeAttribute("readonly");
      nameField.setAttribute("readonly", true);
      quantityField.setAttribute("readonly", true);
      yearField.setAttribute("readonly", true);
      genreField.setAttribute("readonly", true);
    } else {
      numberField.setAttribute("readonly", true);
      nameField.removeAttribute("readonly");
      quantityField.removeAttribute("readonly");
      yearField.removeAttribute("readonly");
      genreField.removeAttribute("readonly");
    }
  }

  function clearFieldValues() {
    numberField.value = "";
    nameField.value = "";
    quantityField.value = "";
    yearField.value = "";
    genreField.value = "";
    searchState = true;
    updateFields();
  }

  function updateGame(result) {
    if (result.length === 0) return;
    const game = result[0];
    numberField.value = game.number;
    nameField.value = game.name;
    quantityField.value = game.quantity;
    yearField.value = game.year;
    genreField.value = game.genre;
    searchState = false;
    updateFields();
  }

  async function send() {
    try {
      if (searchState) {
        //get game
        if (numberField.value.trim().length > 0) {
          const data = await fetch(
            `http://localhost:4000/api/games/${numberField.value}`,
            { mode: "cors" }
          );
          const result = await data.json();
          if (result) {
            if (result.message) {
              updateMessage(result.message, result.type);
            } else {
              updateGame(result);
            }
          }
        }
      } else {
        //put game
        const game = {
          number: numberField.value,
          name: nameField.value,
          quantity: quantityField.value,
          year: yearField.value,
          genre: genreField.value,
        };

        const options = {
          method: "PUT",
          body: JSON.stringify(game),
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        };

        const data = await fetch(
          `http://localhost:4000/api/games/${game.number}`,
          options
        );

        const status = await data.json();

        if (status.message) {
          updateMessage(status.message, status.type);
        }

        searchState = true;
        updateFields();
      }
    } catch (err) {
      updateMessage(err.message, "error");
      console.log(err.message, "error");
    }
  }
})();
