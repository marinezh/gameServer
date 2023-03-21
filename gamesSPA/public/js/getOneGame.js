"use strict";

(function () {
  let resultarea;
  let messagearea;
  let gameId;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    resultarea = document.getElementById("resultarea");
    gameId = document.getElementById("gameid");
    messagearea = document.getElementById("messagearea");
    document.getElementById("submit").addEventListener("click", send);
  }

  async function send() {
    clearMessage();
    resultarea.innerHTML = "";

    try {
      const data = await fetch(
        `http://localhost:4000/api/games/${gameId.value}`,
        { mode: "cors" }
      );
      const result = await data.json();
      console.log(result);
      if (result) {
        if (result.message) {
          updateMessage(result.message, result.type);
        } else {
          updateGame(result);
        }
      }
    } catch (error) {
      updateMessage(`Not found. ${error.message}`, "error");
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

  function updateGame(result) {
    if (result.length == 0) return;
    const game = result[0];
    resultarea.innerHTML = `
        <p><span class="legend">Number: </span>${game.number}</p>
        <p><span class="legend">Name: </span>${game.name}</p>
        <p><span class="legend">Quantity: </span>${game.quantity}</p>
        <p><span class="legend">Year: </span>${game.year}</p>
        <p><span class="legend">Genre: </span>${game.genre}</p>
        `;
  }
})();
