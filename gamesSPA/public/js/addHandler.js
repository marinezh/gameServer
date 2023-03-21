"use strict";

(function () {
  let numberField;
  let nameField;
  let quantityField;
  let yearField;
  let genreField;
  let messagearea;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    numberField = document.getElementById("number");
    nameField = document.getElementById("name");
    quantityField = document.getElementById("quantity");
    yearField = document.getElementById("year");
    genreField = document.getElementById("genre");
    messagearea = document.getElementById("messagearea");
    document.getElementById("submit").addEventListener("click", send);
  }

  async function send() {
    clearMessage();

    const game = {
      number: +numberField.value,
      name: nameField.value,
      quantity: quantityField.value,
      year: yearField.value,
      genre: +genreField.value,
    };

    try {
      const options = {
        method: "POST",
        body: JSON.stringify(game),
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      };

      const data = await fetch("http://localhost:4000/api/games/", options);
      const status = await data.json();

      if (status.message) {
        updateMessage(status.message, status.type);
      }
    } catch (error) {
      console.log("error1", error);
      updateMessage(error.message, "error");
    }
  }

  function updateMessage(message, type) {
    messagearea.textContent = message;
    messagearea.setAttribute("class", type);
  }

  function clearMessage(message, type) {
    messagearea.textContent = "";
    messagearea.removeAttribute("class");
  }
})();
