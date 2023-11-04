export default class GameModel {
  wordsTarget = 15;
  tableBuildingTime = 200;
  wordAttempts = 0;
  correctAttempts = 0;
  state = "not-started";

  start() {
    this.startTime = Date.now();
    this.state = "playing";
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
