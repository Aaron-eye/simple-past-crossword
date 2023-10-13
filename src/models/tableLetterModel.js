import * as coordinatesParser from "../utils/coordinatesParser.js";

const adj = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [1, -1],
];

export default class TableLetterModel {
  isTip = false;

  constructor(coordinates, letter, word, table) {
    this.coordinates = coordinates;
    this.letter = letter;
    this.word = word;
    this.table = table;
  }

  get arrayCordinates() {
    return coordinatesParser.convertToArray(this.coordinates);
  }

  get adjacentCoordinates() {
    return adj.map((adjCoords) => {
      const [x, y] = this.arrayCordinates.map(
        (coord, i) => coord + adjCoords[i]
      );

      return coordinatesParser.convertToString([x, y]);
    });
  }

  get spaceOccupiedByTheSameLetter() {
    const tableGrid = this.table.grid;
    const gridLetter = tableGrid[this.coordinates];
    if (gridLetter) return gridLetter.letter == this.letter;
    else return false;
  }

  get spaceOccupiedByOtherLetter() {
    const tableGrid = this.table.grid;
    const gridLetter = tableGrid[this.coordinates];
    if (gridLetter) return gridLetter.letter !== this.letter;
    else return false;
  }
}
