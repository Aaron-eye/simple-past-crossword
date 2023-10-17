export default class GameModel {
  wordsTarget = 2;
  tableBuildingTime = 200;
  wordAttempts = 0;
  correctAttempts = 0;
  won = false;

  start() {
    this.startTime = Date.now();
  }

  unselectPreviousLetter() {
    this.selectedLetter = null;
    this.selectedWords = null;
  }

  selectLetter(letter) {
    this.selectedLetter = letter;
    letter.getSelected();
    this.selectedWords = letter.words;
    letter.words.forEach((word) => word.getSelected());
  }
}
