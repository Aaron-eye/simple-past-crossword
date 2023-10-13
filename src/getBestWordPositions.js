import getOrientedCoordinates from "./utils/getOrientedCordinates.js";
import TableWord from "./models/tableWord.js";

export default function (candidateWord) {
  const table = this;

  const bestScores = {
    words: [],
    score: 0,
  };

  for (var i = 0; i < candidateWord.length; i++) {
    let score = 0;

    const candidateLetter = candidateWord[i];
    const tableLetters = table.letters[candidateLetter];

    for (const tableLetter of tableLetters) {
      const candidateWordOrientation =
        tableLetter.word.getInvertedOrientation();
      const candidateWordCoordinates = getOrientedCoordinates(
        tableLetter.coordinates,
        candidateWordOrientation,
        -i
      );

      const candidateTableWord = new TableWord(
        candidateWordCoordinates,
        candidateWord,
        candidateWordOrientation,
        table
      );

      for (const letter of candidateTableWord.letters) {
        const gridLetter = table.grid[letter.coordinates];

        if (
          !table.unavailableCoordinates.has(letter.coordinates) ||
          (gridLetter && gridLetter.letter !== letter.letter)
        ) {
          score = 0;
          break;
        }

        if (gridLetter && gridLetter.letter == letter.letter) score++;
      }

      if (score > bestScores.score) {
        bestScores.words.push(candidateTableWord);
        bestScores.score = score;
      }
    }
  }

  return bestScores.words;
}
