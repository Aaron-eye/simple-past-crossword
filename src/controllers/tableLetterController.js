import game from "./gameController.js";

export default class TableLetterController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  render() {
    this.view.render(this.model.letter);
    this.view.checkClick(this._handleClick.bind(this));
  }

  getSelected() {
    this.view.getSelected();
  }

  getUnselected() {
    this.view.getUnselected();
  }

  getWordSelected() {
    this.view.getWordSelected();
  }

  getWordUnselected() {
    this.view.getWordUnselected();
  }

  getCorrect() {
    this.view.getCorrect();
  }

  getIncorrect() {
    this.view.getIncorrect();
  }

  _handleClick() {
    game.selectLetter(this);
    if (this.words.length === 1) {
      game.wordBeingTyped = this.model.words[0];
    } else game.wordBeingTyped = null;
  }

  set isTip(newValue) {
    this.model.isTip = newValue;
  }

  set correctLetter(value) {
    this.model.correctLetter = value;
  }

  get correctLetter() {
    return this.model.correctLetter;
  }

  get attempted() {
    return this.model.attemptedLetter !== "";
  }

  get isAttemptCorrect() {
    return this.model.attemptedLetter == this.model.letter;
  }

  get isTip() {
    return this.model.isTip;
  }

  get spaceOccupiedByTheSameLetter() {
    return this.model.spaceOccupiedByTheSameLetter;
  }

  get spaceOccupiedByOtherLetter() {
    return this.model.spaceOccupiedByOtherLetter;
  }

  get adjacentCoordinates() {
    return this.model.adjacentCoordinates;
  }

  get coordinates() {
    return this.model.coordinates;
  }

  get words() {
    return this.model.words;
  }

  get letter() {
    return this.model.letter;
  }

  get letterOnTableHere() {
    return this.model.letterOnTableHere;
  }

  get indexOnWord() {
    return this.model.indexOnWord;
  }
}
