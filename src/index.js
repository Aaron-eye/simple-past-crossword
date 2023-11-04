import { loadWords } from "./models/tableModel.js";
import game from "./controllers/gameController.js";

const startGameContainer = document.querySelector(".start-game-container");
const startGameButton = document.querySelector(".start-btn");

(async function () {
  await loadWords();

  startGameButton.onclick = () => {
    startGameContainer.style.display = "none";
    game.start();
  };
})();
