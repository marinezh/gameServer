"use strict";

(function () {
  document.addEventListener("DOMContentLoaded", init);

  async function init() {
    try {
      const data = await fetch("http://localhost:4000/api/games", {
        mode: "cors",
      });
      const games = await data.json();

      const resultset = document.getElementById("resultset");
      for (const game of games) {
        const tr = document.createElement("tr");
        tr.appendChild(createCell(game.number));
        tr.appendChild(createCell(game.name));
        tr.appendChild(createCell(game.quantity));
        tr.appendChild(createCell(game.year));
        tr.appendChild(createCell(game.genre));
        resultset.appendChild(tr);
      }
    } catch (error) {
      document.getElementById("messagearea").innerHTML = `
            <p class="error">${error.message}</p>`;
    }
  } //end of init

  function createCell(data) {
    const td = document.createElement("td");
    td.textContent = data;
    return td;
  }
})();
