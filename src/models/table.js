import Extremities from "./extremities.js";

const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

let allWords;

const loadWords = async function () {
  return new Promise((resolve, reject) => {
    fetch("data/verbs.json")
      .then((response) => response.json())
      .then(async (data) => {
        allWords = data;
        resolve();
      });
  });
};

export default class Table {
  letters = {};
  grid = {};
  remainingWords = {};
  size = [0, 0];
  unavailableCoordinates = {};

  constructor(wordsTarget) {
    this.remainingWords = allWords
      .sort(() => 0.5 - Math.random())
      .slice(0, wordsTarget * 4)
      .sort((a, b) => a - b);

    alphabet.forEach((letter) => {
      this.letters[letter] = [];
    });

    this.extremities = new Extremities();
  }

  updateSize(newLetterCoordinates) {
    this.extremities.update(newLetterCoordinates);
    this.size[0] = Math.abs(this.extremities.x.max - this.extremities.x.min);
    this.size[1] = Math.abs(this.extremities.y.max - this.extremities.y.min);
  }

  placeWord(word) {
    const coordinatesBeforeWord = getOrientedCoordinates(
      word.coordinates,
      word.orientation,
      -1
    );
    const coordinatesAfterWord = getOrientedCoordinates(
      word.coordinates,
      word.orientation,
      word.word.length
    );
    this.addUnavailability(coordinatesBeforeWord, "all");
    this.addUnavailability(coordinatesAfterWord, "all");

    for (const letter of this.letters) {
      this.addLetter(letter);
    }
  }

  addLetter(letter) {
    if ()

    letter.removeAvailability();
    this.updateSize(letter.coordinates);
    this.grid[letter.coordinates] = letter;
    this.letters[letter.letter].push(letter); //Ex: "b": [letter object]
  }

  addUnavailability(coordinates, ...newUnavailabilities) {
    if (!this.unavailableCoordinates[coordinates])
      this.unavailableCoordinates[coordinates] = new Set();

    const unavailabilities = this.unavailableCoordinates[coordinates];

    if (unavailabilities.has("all")) return; //If the "all" unavailability is already present, do nothing
    if (newUnavailabilities.includes("all")) {
      unavailabilities.clear();
      unavailabilities.add("all");
      return;
    }

    unavailabilities.add(...newUnavailabilities);

    /*for (const adjCoords of adj) {
      const [x, y] = this.arrayCordinates.map(
        (coord, i) => coord + adjCoords[i]
      );

      this.table.unavailableCoordinates.add(
        coordinatesParser.convertToString([x, y])
      );
    }*/
  }
}

export { loadWords };
