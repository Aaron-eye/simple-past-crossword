export default class TableLetterController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  render() {
    this.view.render(this.model.letter);

    if (this.model.headOf) {
      this.view.renderWordIndex(
        this.headOf.index,
        this.model.headOf.orientation
      );
    }

    this.view.setFontSize();

    window.addEventListener("resize", () => {
      if (this.model.headOf)
        this.view.setIndexElementPosition(this.model.headOf.orientation);
      this.view.setFontSize();
    });
  }

  addClickListener(handler) {
    this.view.checkClick(handler);
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

  updateAttempt(attemptedLetter) {
    this.model.attemptedLetter = attemptedLetter;
    this.view.update(attemptedLetter);
  }

  set isTip(newValue) {
    this.model.isTip = newValue;
  }

  set headOf(newValue) {
    this.model.headOf = newValue;
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

  get attemptedLetter() {
    return this.model.attemptedLetter;
  }

  get isAttemptCorrect() {
    return this.model.attemptedLetter == this.model.letter;
  }

  get isTip() {
    return this.model.isTip;
  }

  get headOf() {
    return this.model.headOf;
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
