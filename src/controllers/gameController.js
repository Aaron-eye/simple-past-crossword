import letterTyped from "../utils/letterTyped.js";
import TableModel, { loadWords } from "../models/tableModel.js";
import TableController from "./tableController.js";
import TableView from "../views/tableView.js";
import GameModel from "../models/gameModel.js";
import GameView from "../views/gameView.js";
import HintModel from "../models/hintModel.js";
import HintView from "../views/hintView.js";
import HintController from "./hintController.js";

class GameController {
  constructor(model, view) {
    (this.model = model), (this.view = view);
  }

  _setTableScore(tableModel) {
    return (
      Math.sqrt(
        Math.pow(tableModel.size[0] - 1, 2) +
          Math.pow(tableModel.size[1] - 1, 2)
      ) *
      (tableModel.size[1] / 500)
    );
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
      const tableModel = new TableModel(this.model.wordsTarget);
      const tableView = new TableView();
      const table = new TableController(tableModel, tableView);

      const newTableScore = this._setTableScore(tableModel);

      if (
        bestTable.score === null ||
        (!table.invalid && newTableScore < bestTable.score)
      ) {
        bestTable.table = table;
        bestTable.score = newTableScore;
      }

      tablesBuilt++;
      if (performance.now() - timeBeforeLoop > this.model.tableBuildingTime) {
        onTime = false;
      }
    }

    console.log("Best score:", bestTable.score);
    console.log("Tables built:", tablesBuilt);
    const table = bestTable.table;

    //table.printOrderedWords();
    //table.log();

    table.render();
    this.table = table;
    return table;
  }

  start() {
    const table = this.createTable();

    this.model.start();
    this._updateTimer();

    window.addEventListener("click", (event) => {
      if (!event.target.closest(".crossword-letter-cell")) {
        this._unselectPreviousLetter();
      }
    });

    for (const letter of table.lettersList) {
      if (letter) {
        letter.addClickListener((event) => {
          this._handleLetterClick(event, letter);
        });
      }
    }

    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "Enter":
          this._handleWordAttempt();
          break;

        case "Backspace":
          this._handleTurnback();
          break;

        case " ":
          event.preventDefault();
          this._goToNextLetter();
          break;
      }

      if (letterTyped(event)) {
        this._handleLetterAttempt(event.key);
      }
    });

    this.table.words.forEach((word, i) => {
      const hintString = `${i + 1}: ${word.wordString}`;

      const hintModel = new HintModel(hintString);
      const hintView = new HintView();
      const hint = new HintController(hintModel, hintView);

      hint.render();
      word.hint = hint;
    });
  }

  reset() {
    /*const newGame = new Game();
    Object.assign(this, newGame);*/
  }

  _win() {
    this.model.won = true;
    this.view.showWinMessage();
  }

  _updateTimer() {
    this.view.updateTimer(Date.now() - this.model.startTime);

    if (!this.model.won) setTimeout(this._updateTimer.bind(this), 1000);
  }

  _handleTurnback() {
    this.selectedLetter.updateAttempt("");
    this._goToPreviousLetter();
  }

  _goToNextLetter() {
    let nextLetter;
    let nextLetterI = this.indexOnWordBeingTyped + 1;
    while (nextLetterI < this.wordBeingTyped.length) {
      const nextLetterPossibility = this.wordBeingTyped.letters[nextLetterI];

      if (!nextLetterPossibility.correctLetter) {
        nextLetter = nextLetterPossibility;
        break;
      }

      nextLetterI++;
    }

    if (!nextLetter) return;
    this.selectLetter(nextLetter);
  }

  _goToPreviousLetter() {
    let nextLetter;
    let nextLetterI = this.indexOnWordBeingTyped - 1;
    while (nextLetterI >= 0) {
      const nextLetterPossibility = this.wordBeingTyped.letters[nextLetterI];

      if (!nextLetterPossibility.correctLetter) {
        nextLetter = nextLetterPossibility;
        break;
      }

      nextLetterI--;
    }

    if (!nextLetter) return;
    this.selectLetter(nextLetter);
  }

  _handleWordAttempt() {
    if (
      !this.wordBeingTyped ||
      !this.wordBeingTyped.allLettersAttempted ||
      this.wordBeingTyped.attemptLocker
    )
      return;

    const attempt = this.wordBeingTyped.checkAttempt();
    if (attempt) {
      this._unselectPreviousLetter();
      this.model.correctAttempts++;

      if (this.model.correctAttempts >= this.model.wordsTarget) {
        this._win();
      }
    }

    this.model.wordAttempts++;
    this.view.updateWordAttempts(this.model.wordAttempts);
  }

  _handleLetterAttempt(letter) {
    if (!this.selectedLetter) return;

    const previousLetterOnWordBeingTyped =
      this.wordBeingTyped.letters[this.indexOnWordBeingTyped - 1];
    if (
      previousLetterOnWordBeingTyped &&
      previousLetterOnWordBeingTyped.correctLetter &&
      letter === previousLetterOnWordBeingTyped.letter
    )
      return;
    this.selectedLetter.updateAttempt(letter);

    if (!this.wordBeingTyped) return;

    this._goToNextLetter();
  }

  _handleLetterClick(event, letter) {
    this.selectLetter(letter);
  }

  _unselectPreviousLetter() {
    this.model.selectedLetter?.getUnselected();
    this.model.selectedWords?.forEach((word) => word.getUnselected());

    this.model.unselectPreviousLetter();
  }

  selectLetter(letter) {
    if (letter.correctLetter) return;

    if (this.model.wordBeingTyped)
      this.model.wordBeingTyped.attemptLocker = false;

    this._unselectPreviousLetter();

    this.model.selectLetter(letter);

    if (letter.words.length === 1) {
      this.wordBeingTyped = letter.words[0];
    }
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

  get indexOnWordBeingTyped() {
    return this.selectedLetter.indexOnWord[this.wordBeingTyped.wordString];
  }
}

const gameModel = new GameModel();
const gameView = new GameView();
const game = new GameController(gameModel, gameView);
export default game;
