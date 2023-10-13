import * as coordinatesParser from "./utils/coordinatesParser.js";
import getNewWord from "./getNewWord.js";
import Table, { loadWords } from "./models/table.js";
import TableWord from "./models/tableWord.js";

const wordsTarget = 10;
const orientations = ["horizontal", "vertical"];

const createTable = function () {
  const table = new Table(wordsTarget);
  const words = table.remainingWords;
  let amountOfWordsOnTheTable = 0;

  const firstOrientation = orientations[Math.floor(Math.random() * 2)];
  const firstWord = new TableWord(
    "0,0",
    table.remainingWords.splice(words.length - 1, 1)[0],
    firstOrientation,
    table
  );
  table.placeWord(firstWord);
  console.log(firstWord.word);

  while (amountOfWordsOnTheTable < wordsTarget) {
    const newWord = getNewWord.call(table);
    if (newWord) {
      console.log(newWord.word);
      table.placeWord(newWord);
    } else {
      console.log("Could not finish the crossword!");
      break;
      //return;
    }
  }

  return table;
};

(async function () {
  await loadWords();

  const table = createTable();
  for (var i = table.extremities.y.min; i < table.extremities.y.max; i++) {
    let line = "";
    for (var j = table.extremities.x.min; j < table.extremities.x.max; j++) {
      const coordinates = coordinatesParser.convertToString([j, i]);
      let tableLetter = table.grid[coordinates]?.letter;
      if (!tableLetter) tableLetter = " ";
      if (tableLetter.length > 1) console.log("ERROR!");
      line += tableLetter + "  ";
    }
    console.log(line);
  }
})();
