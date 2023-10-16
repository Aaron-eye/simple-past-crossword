import { loadWords } from "./models/tableModel.js";
import game from "./controllers/gameController.js";

(async function () {
  await loadWords();
  game.start();
})();
