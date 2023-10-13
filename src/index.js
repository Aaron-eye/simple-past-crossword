import * as coordinatesParser from "./utils/coordinatesParser.js";
import TableModel, { loadWords } from "./models/tableModel.js";
import TableController from "./controllers/tableController.js";

const wordsTarget = 10;

const logTable = function (table) {
  const extremities = table.model.extremities;

  for (var i = extremities.y.min; i < extremities.y.max + 1; i++) {
    let line = "";

    for (var j = extremities.x.min; j < extremities.x.max + 1; j++) {
      const coordinates = coordinatesParser.convertToString([j, i]);
      let tableLetter = table.model.grid[coordinates]?.letter;
      if (!tableLetter) tableLetter = " ";
      if (tableLetter.length > 1) console.log("ERROR!");
      line += tableLetter + "  ";
    }
    console.log(line);
  }
};

(async function () {
  await loadWords();

  const tableModel = new TableModel(wordsTarget);
  const table = new TableController(tableModel);

  logTable(table);
})();
