export default class GameModel {
  unselectPreviousLetter() {
    this.selectedLetter?.getUnselected();
    this.selectedWords?.forEach((word) => word.getUnselected());

    this.selectedLetter = null;
    this.selectedWords = null;
  }

  selectLetter(letter) {
    if (letter.correctLetter) return;

    this.unselectPreviousLetter();

    this.selectedLetter = letter;
    letter.getSelected();
    this.selectedWords = letter.words;
    letter.words.forEach((word) => word.getSelected());
  }
}
