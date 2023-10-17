export default class TableWord {
  letters = [];
  correctWord = false;
  attemptLocker = false;

  constructor(coordinates, wordString, orientation, table) {
    this.coordinates = coordinates;
    this.wordString = wordString;
    this.secondWord;
    this.orientation = orientation;
    this.table = table;
  }

  get inverseOrientation() {
    return this.orientation == "horizontal" ? "vertical" : "horizontal";
  }

  changeLetter(letterIndex, newLetter) {
    this.letters[letterIndex] = newLetter;
  }
}
