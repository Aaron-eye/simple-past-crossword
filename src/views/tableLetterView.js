import getOrientedCordinates from "../utils/getOrientedCordinates.js";

const crosswordGrid = document.querySelector(".crossword-grid");

export default class TableletterView {
  selected = false;
  elementCell = null;
  rendered = false;

  constructor() {}

  render() {
    this.elementCell = document.createElement("div");
    this.element = document.createElement("div");

    this.elementCell.classList.add(
      "crossword-grid-cell",
      "crossword-letter-cell"
    );
    this.element.classList.add("crossword-letter");

    this.elementCell.appendChild(this.element);
    crosswordGrid.appendChild(this.elementCell);

    this.rendered = true;
  }

  renderWordIndex(index, orientation) {
    const indexElement = document.createElement("span");
    indexElement.classList.add("word-index");
    indexElement.textContent = index + 1;

    this.elementCell.appendChild(indexElement);
    this.indexElement = indexElement;

    this.setIndexElementPosition(orientation);
  }

  checkClick(handler) {
    // this.elementCell.addEventListener("click", this.getSelected.bind(this));
    this.elementCell.addEventListener("click", handler);
  }

  setFontSize() {
    const fontSize = this.elementCell.offsetWidth * 0.04;
    this.element.style.fontSize = `${fontSize}rem`;
    if (this.indexElement) {
      const indexFontSize = this.elementCell.offsetWidth * 0.03;
      this.indexElement.style.fontSize = `${indexFontSize}rem`;
    }
  }

  getSelected() {
    this._addClass("selected");
  }

  getUnselected() {
    this._removeClass("selected");
  }

  getWordSelected() {
    this._addClass("word-selected");
  }

  getWordUnselected() {
    this._removeClass("word-selected");
  }

  getCorrect() {
    this._removeClass("incorrect");
    this._addClass("correct");
  }

  getIncorrect() {
    this._addClass("incorrect");
  }

  update(letter) {
    this.element.textContent = letter;
  }

  _addClass(classToBeAdded) {
    this.elementCell.classList.add(classToBeAdded);
    this.element.classList.add(classToBeAdded);
  }

  _removeClass(classToBeRemoved) {
    this.elementCell.classList.remove(classToBeRemoved);
    this.element.classList.remove(classToBeRemoved);
  }

  setIndexElementPosition(orientation) {
    const [left, top] = getOrientedCordinates(
      "0,0",
      orientation,
      -this.elementCell.offsetWidth / 2 - 2,
      false
    )
      //.map((coord) => (coord == 0 ? this.elementCell.offsetWidth / 2 : coord))
      .map((coord) => coord + "px");

    this.indexElement.style.top = top;
    this.indexElement.style.left = left;
  }
}
