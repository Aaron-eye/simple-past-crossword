export default class TableWord {
  letters = [];

  constructor(coordinates, word, orientation, table) {
    this.coordinates = coordinates;
    this.word = word;
    this.orientation = orientation;
    this.table = table;
  }

  get inverseOrientation() {
    return this.orientation == "horizontal" ? "vertical" : "horizontal";
  }
}
