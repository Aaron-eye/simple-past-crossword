import getOrientedCoordinates from "../utils/getOrientedCordinates.js";
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

export default class TableModel {
  letters = {};
  grid = {};
  remainingWords = {};
  size = [0, 0];
  coordinateRestrictions = {};
  amountOfWords = 0;
  orderedWords = [];

  constructor(wordsTarget) {
    this.wordsTarget = wordsTarget;
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
    this.size[0] =
      Math.abs(this.extremities.x.max - this.extremities.x.min) + 1;
    this.size[1] =
      Math.abs(this.extremities.y.max - this.extremities.y.min) + 1;
  }

  placeWord(word) {
    this.orderedWords.push(word);
    //Adding "all" unavailability on the cells before and after the word
    const coordinatesBeforeWord = getOrientedCoordinates(
      word.coordinates,
      word.orientation,
      -1
    );
    const coordinatesAfterWord = getOrientedCoordinates(
      word.coordinates,
      word.orientation,
      word.wordString.length
    );
    this._addCoordinateRestrictions(coordinatesBeforeWord, ["all"]);
    this._addCoordinateRestrictions(coordinatesAfterWord, ["all"]);

    for (const letter of word.letters) {
      //Adding "same orientation" and "tip" unavailabilities on the sides of the word
      const sideCoordinates = [
        getOrientedCoordinates(letter.coordinates, word.inverseOrientation, -1),
        getOrientedCoordinates(letter.coordinates, word.inverseOrientation, 1),
      ];
      for (const sc of sideCoordinates) {
        this._addCoordinateRestrictions(sc, [word.orientation, "tip"]);
      }

      this._placeLetter(letter);
    }
  }

  _createIntersection(intersectionLetter, newLetter) {
    const firstWord = newLetter.words[0];
    firstWord.changeLetter(
      newLetter.indexOnWord[firstWord.wordString],
      intersectionLetter
    );

    intersectionLetter.words.push(newLetter.words[0]);
  }

  _placeLetter(letter) {
    if (letter.spaceOccupiedByTheSameLetter) {
      this._addCoordinateRestrictions(letter.coordinates, ["all"]);
      for (const adjacentCoordinate of letter.adjacentCoordinates) {
        this._addCoordinateRestrictions(adjacentCoordinate, ["all"]);
      }

      this._createIntersection(this.grid[letter.coordinates], letter);

      return;
    }

    this._addCoordinateRestrictions(letter.coordinates, [
      letter.words[0].orientation,
    ]);

    this.updateSize(letter.coordinates);
    this.grid[letter.coordinates] = letter;
    this.letters[letter.letter].push(letter); //Ex: "b": [letter object]
  }

  _addCoordinateRestrictions(coordinates, newRestrictions) {
    if (!this.coordinateRestrictions[coordinates]) {
      this.coordinateRestrictions[coordinates] = {
        set: new Set(),
      };
    } else {
      const restrictions = this.coordinateRestrictions[coordinates];
      if (restrictions.set.has("all")) return; //If the "all" unavailability is already present, do nothing
    }

    const restrictions = this.coordinateRestrictions[coordinates];
    if (newRestrictions.includes("all")) {
      restrictions.set.clear();
      restrictions.set.add("all");
      return;
    }

    newRestrictions.forEach((restriction) => restrictions.set.add(restriction));
  }
}

export { loadWords };
