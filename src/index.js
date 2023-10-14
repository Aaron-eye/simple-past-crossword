import TableModel, { loadWords } from "./models/tableModel.js";
import TableController from "./controllers/tableController.js";
import TableView from "./views/tableView.js";

const wordsTarget = 15;

(async function () {
  await loadWords();

  const bestTable = {
    table: {},
    score: null,
  };

  const tableBuildingTime = 300;
  const timeBeforeLoop = performance.now();

  let tablesBuilt = 0;
  let onTime = true;
  while (onTime) {
    const tableModel = new TableModel(wordsTarget);
    const tableView = new TableView();
    const table = new TableController(tableModel, tableView);

    const newTableScore = Math.sqrt(
      Math.pow(tableModel.size[0] - 1, 2) + Math.pow(tableModel.size[1] - 1, 2)
    );

    if (bestTable.score === null || newTableScore < bestTable.score) {
      bestTable.table = table;
      bestTable.score = newTableScore;
    }

    tablesBuilt++;
    if (performance.now() - timeBeforeLoop > tableBuildingTime) {
      onTime = false;
    }
  }

  console.log("Best score:", bestTable.score);
  console.log(tablesBuilt);
  const table = bestTable.table;

  table.printOrderedWords();

  //table.log();
  table.render();

  document.querySelectorAll(".crossword-grid-cell").forEach((cell, cellI) => {
    const row = Math.floor(cellI / table.size[0]);
    const column = cellI - row * table.size[0];
    const x = table.extremities.x.min + column;
    const y = table.extremities.y.min + row;
    //cell.innerHTML += `${x}, ${y}`;

    cell.addEventListener("click", () => {
      console.log(table.model.coordinateRestrictions[`${x},${y}`].set);
    });
  });
})();
