import getOrientedCoordinates from "../utils/getOrientedCordinates.js";
import TableLetter from "./tableLetter.js";

export default class TableWord {
  letters = [];

  constructor(coordinates, word, orientation, table) {
    this.word = word;
    this.orientation = orientation;
    this.table = table;

    for (var i = 0; i < word.length; i++) {
      const letter = word[i];

      const tableLetter = new TableLetter(
        getOrientedCoordinates(coordinates, orientation, i),
        letter,
        this,
        table
      );
      this.letters.push(tableLetter);
    }
  }

  getInvertedOrientation() {
    return this.orientation == "horizontal" ? "vertical" : "horizontal";
  }
}
