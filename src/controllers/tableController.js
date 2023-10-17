import * as coordinatesParser from "../utils/coordinatesParser.js";
import TableWordModel from "../models/tableWordModel.js";
import getOrientedCordinates from "../utils/getOrientedCordinates.js";
import TableWordController from "./tableWordController.js";
import TableWordView from "../views/tableWordView.js";

const orientations = ["horizontal", "vertical"];

export default class TableController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.fill();
  }

  fill() {
    const firstOrientation = orientations[Math.floor(Math.random() * 2)];
    const remainingWords = this.model.remainingWords;

    const firstWordModel = new TableWordModel(
      "0,0",
      remainingWords.splice(remainingWords.length - 1, 1)[0],
      firstOrientation,
      this
    );
    const firstWordView = new TableWordView();
    const firstWord = new TableWordController(firstWordModel, firstWordView);
    this.model.placeWord(firstWord);

    while (this.model.words.length < this.model.wordsTarget) {
      const newWord = this.getNewWord();

      if (newWord) {
        this.model.placeWord(newWord);
      } else {
        this.invalid = true;
        break;
      }
    }
  }

  getNewWord() {
    for (var i = this.model.remainingWords.length - 1; i > 0; i--) {
      const candidateWord = this.model.remainingWords[i];
      //Remember: the following array will hold copies of the same word, but with different positions in its letters
      const bestWords = this.getBestWordPositions(candidateWord);

      if (bestWords && bestWords.length !== 0) {
        this.model.remainingWords.splice(i, 1);
        return bestWords[Math.floor(bestWords.length * Math.random())];
      }
    }

    return;
  }

  getBestWordPositions(candidateWord) {
    const bestScores = {
      words: [],
      score: 0,
    };

    for (var i = 0; i < candidateWord.length; i++) {
      const candidateLetter = candidateWord[i];
      const tableLetters = this.model.letters[candidateLetter];

      for (const tableLetter of tableLetters) {
        if (tableLetter.words.length > 1) continue; //The candidate letter can only be placed on non-intersected letters

        const candidateWordOrientation =
          tableLetter.words[0].inverseOrientation;
        const candidateWordCoordinates = getOrientedCordinates(
          tableLetter.coordinates,
          candidateWordOrientation,
          -i
        );

        const candidateTableWordModel = new TableWordModel(
          candidateWordCoordinates,
          candidateWord,
          candidateWordOrientation,
          this.model
        );
        const candidateTableWordView = new TableWordView();
        const candidateTableWord = new TableWordController(
          candidateTableWordModel,
          candidateTableWordView
        );

        const score = this.getWordScore(candidateTableWord);

        if (score > bestScores.score && score !== 0) {
          bestScores.words.push(candidateTableWord);
          bestScores.score = score;
        }
      }
    }

    if (bestScores.score == 0) return;
    return bestScores.words;
  }

  getWordScore(candidateTableWord) {
    let score = 0;
    for (const letter of candidateTableWord.letters) {
      if (letter.spaceOccupiedByOtherLetter) {
        return 0;
      }

      const restrictions =
        this.model.coordinateRestrictions[letter.coordinates];

      if (restrictions) {
        if (
          restrictions.set.has("all") ||
          restrictions.set.has(candidateTableWord.orientation) ||
          (restrictions.set.has("tip") && letter.isTip == true) ||
          (restrictions.set.has("head") && letter.headOf)
        ) {
          return 0;
        }
      }

      if (letter.spaceOccupiedByTheSameLetter) score++;
    }

    return score;
  }

  get grid() {
    return this.model.grid;
  }

  /*log() {
    const extremities = this.model.extremities;

    for (var i = extremities.y.min; i < extremities.y.max + 1; i++) {
      let line = "";

      for (var j = extremities.x.min; j < extremities.x.max + 1; j++) {
        const coordinates = coordinatesParser.convertToString([j, i]);
        let tableLetter = this.model.grid[coordinates]?.letter;
        if (!tableLetter) tableLetter = " ";
        line += tableLetter + "  ";
      }
      console.log(line);
    }
  }*/

  render() {
    this.view.render(this.model);

    for (const letter of this.model.lettersList) {
      if (!letter) {
        this.view.addEmptySquare();
        continue;
      }
      letter.render();
    }
  }

  printOrderedWords() {
    console.log(this.model.words.map((w) => w.wordString));
  }

  get size() {
    return this.model.size;
  }

  get extremities() {
    return this.model.extremities;
  }

  get words() {
    return this.model.words;
  }

  get lettersList() {
    return this.model.lettersList;
  }
}
