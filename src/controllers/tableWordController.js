import getOrientedCoordinates from "../utils/getOrientedCordinates.js";
import TableLetterModel from "../models/tableLetterModel.js";
import TableLetterController from "./tableLetterController.js";
import TableletterView from "../views/tableLetterView.js";

export default class TableWordController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    for (var i = 0; i < model.wordString.length; i++) {
      const letter = model.wordString[i];

      const tableLetterModel = new TableLetterModel(
        getOrientedCoordinates(model.coordinates, model.orientation, i),
        letter,
        this,
        model.table
      );
      tableLetterModel.indexOnWord[this.wordString] = i;
      const tableLetterView = new TableletterView();
      const tableLetter = new TableLetterController(
        tableLetterModel,
        tableLetterView
      );

      if (i == 0) {
        this.model.head = tableLetter;
        tableLetter.headOf = this;
      }

      if (i == 0 || i == model.wordString.length - 1) tableLetter.isTip = true;

      this.model.letters.push(tableLetter);
    }
  }

  getSelected() {
    this.model.hint.highlight();
    this.model.letters.forEach((letter) => {
      letter.getWordSelected();
    });
  }

  getUnselected() {
    this.model.hint.stopHighlighting();
    this.model.letters.forEach((letter) => {
      letter.getWordUnselected();
    });
  }

  changeLetter(letterIndex, newLetter) {
    this.model.changeLetter(letterIndex, newLetter);
    newLetter.indexOnWord[this.model.wordString] = letterIndex;
  }

  checkAttempt() {
    const attemptCorrect = this.model.letters.every(
      (letter) => letter.isAttemptCorrect
    );
    if (attemptCorrect) {
      this.model.letters.forEach((letter) => {
        letter.correctLetter = true;
        letter.getCorrect();
      });
    } else {
      this.model.attemptLocker = true;
      this.model.letters.forEach((letter) => {
        letter.getIncorrect();
      });
    }

    return attemptCorrect;
  }

  set index(value) {
    this.model.index = value;
  }

  set attemptLocker(value) {
    this.model.attemptLocker = value;
  }

  set head(value) {
    this.model.head = value;
  }

  set hint(value) {
    this.model.hint = value;
  }

  get index() {
    return this.model.index;
  }

  get attemptLocker() {
    return this.model.attemptLocker;
  }

  get correctWord() {
    return this.model.correctWord;
  }

  get allLettersAttempted() {
    return this.model.letters.every((letter) => letter.attempted);
  }

  get letters() {
    return this.model.letters;
  }

  get coordinates() {
    return this.model.coordinates;
  }

  get orientation() {
    return this.model.orientation;
  }

  get wordString() {
    return this.model.wordString;
  }

  get inverseOrientation() {
    return this.model.inverseOrientation;
  }

  get length() {
    return this.model.wordString.length;
  }
}
