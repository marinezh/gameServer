"use strict";

(function () {
  let inputField;
  let messagearea;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    inputField = document.getElementById("gamenumber");
    messagearea = document.getElementById("messagearea");

    document.getElementById("submit").addEventListener("click", send);
  }

  async function send() {
    clearMessage();
    const number = inputField.value;
    try {
      const options = {
        method: "DELETE",
        mode: "cors",
      };
      const data = await fetch(
        `http://localhost:4000/api/games/${number}`,
        options
      );
      const status = await data.json();

      if (status.message) {
        updateMessage(status.message, status.type);
      }
    } catch (err) {
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
