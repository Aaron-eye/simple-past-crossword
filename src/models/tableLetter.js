import * as coordinatesParser from "../utils/coordinatesParser.js";

const adj = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [1, -1],
];

export default class TableLetter {
  intersection = false;
  tip = false;

  constructor(coordinates, letter, word, table) {
    this.coordinates = coordinates;
    this.letter = letter;
    this.word = word;
    this.table = table;
  }

  get arrayCordinates() {
    return coordinatesParser.convertToArray(this.coordinates);
  }

  get adjacentLetters() {
    return adj
      .map((adjCoords) => {
        const [x, y] = this.arrayCordinates.map(
          (coord, i) => coord + adjCoords[i]
        );

        return this.table.grid[coordinatesParser.convertToString([x, y])];
      })
      .filter((l) => l);
  }
}
