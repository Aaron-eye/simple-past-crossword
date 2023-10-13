import getBestWordPositions from "./getBestWordPositions.js";

export default function () {
  const table = this;

  for (var i = table.remainingWords.length - 1; i > 0; i--) {
    const candidateWord = table.remainingWords[i];
    //Remember: the following array will hold copies of the same word, but with different positions in its letters
    const bestWords = getBestWordPositions.call(table, candidateWord);

    if (bestWords.length !== 0) {
      table.remainingWords.splice(i, 1);
      return bestWords[Math.floor(bestWords.length * Math.random())];
    }
  }

  return;
}
