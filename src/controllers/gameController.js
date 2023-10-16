import letterTyped from "../utils/letterTyped.js";
import TableModel, { loadWords } from "../models/tableModel.js";
import TableController from "./tableController.js";
import TableView from "../views/tableView.js";
import GameModel from "../models/gameModel.js";
import GameView from "../views/gameView.js";

const wordsTarget = 4; //20;
const tableBuildingTime = 200;

class GameController {
  wordAttempts = 0;
  constructor(model, view) {
    (this.model = model), (this.view = view);
  }

  createTable() {
    const bestTable = {
      table: {},
      score: null,
    };

    const timeBeforeLoop = performance.now();

    let tablesBuilt = 0;
    let onTime = true;
    while (onTime) {
      const tableModel = new TableModel(wordsTarget);
      const tableView = new TableView();
      const table = new TableController(tableModel, tableView);

      const newTableScore = Math.sqrt(
        Math.pow(tableModel.size[0] - 1, 2) +
          Math.pow(tableModel.size[1] - 1, 2)
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
    console.log("Tables built:", tablesBuilt);
    const table = bestTable.table;

    //table.printOrderedWords();
    //table.log();

    table.render();
  }

  start() {
    this.createTable();

    window.addEventListener("click", this._handleClick.bind(this), false);

    window.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this._handleWordAttempt();
      }
      if (letterTyped(event)) {
        this._handleLetterAttempt(event.key);
      }
    });
  }

  reset() {
    /*const newGame = new Game();
    Object.assign(this, newGame);*/
  }

  _handleWordAttempt() {
    if (!this.wordBeingTyped || !this.wordBeingTyped.allLettersAttempted)
      return;

    const attempt = this.wordBeingTyped.checkAttempt();
    if (attempt) {
      this.model.unselectPreviousLetter();
    }

    this.wordAttempts++;
  }

  _handleLetterAttempt(letter) {
    if (!this.selectedLetter) return;

    this.selectedLetter.model.attemptedLetter = letter;
    this.selectedLetter.view.update(letter);

    if (!this.wordBeingTyped) return;

    const indexOnWordBeingTyped =
      this.selectedLetter.model.indexOnWord[this.wordBeingTyped.wordString];

    let nextLetter;
    let nextLetterI = indexOnWordBeingTyped + 1;
    while (nextLetterI < this.wordBeingTyped.length) {
      const nextLetterPossibility = this.wordBeingTyped.letters[nextLetterI];

      console.log("next letter:", nextLetterPossibility.letter);
      if (!nextLetterPossibility.correctLetter) {
        nextLetter = nextLetterPossibility;
        break;
      }

      nextLetterI++;
    }

    if (!nextLetter) return;
    this.model.selectLetter(nextLetter);
  }

  _handleClick(event) {
    if (!event.target.closest(".crossword-letter-cell")) {
      this.model.unselectPreviousLetter();
    }
  }

  selectLetter(letter) {
    this.model.selectLetter(letter);
  }

  set wordBeingTyped(newWord) {
    this.model.wordBeingTyped = newWord;
  }

  get wordBeingTyped() {
    return this.model.wordBeingTyped;
  }

  get selectedLetter() {
    return this.model.selectedLetter;
  }
}

const gameModel = new GameModel();
const gameView = new GameView();
const game = new GameController(gameModel, gameView);
export default game;
