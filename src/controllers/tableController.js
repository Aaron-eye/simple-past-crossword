import TableWordModel from "../models/tableWordModel.js";
import getOrientedCordinates from "../utils/getOrientedCordinates.js";
import TableWordController from "./tableWordController.js";

const orientations = ["horizontal", "vertical"];

export default class TableController {
  constructor(model) {
    this.model = model;

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
    const firstWord = new TableWordController(firstWordModel);
    this.model.placeWord(firstWord);
    console.log(firstWord.word);

    while (this.model.amountOfWords < this.model.wordsTarget) {
      const newWord = this.getNewWord();

      if (newWord) {
        console.log(newWord.word);
        this.model.placeWord(newWord);
        this.model.amountOfWords++;
      } else {
        //console.log("Could not finish the crossword!");
        break;
        //return;
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
        const candidateWordOrientation = tableLetter.word.inverseOrientation;
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
        const candidateTableWord = new TableWordController(
          candidateTableWordModel
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
          restrictions.has("all") ||
          restrictions.has(candidateTableWord.orientation) ||
          (restrictions.has("tip") && letter.isTip == true)
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
}
