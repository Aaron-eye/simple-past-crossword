const crosswordGrid = document.querySelector(".crossword-grid");

export default class TableletterView {
  constructor() {}

  render(letter) {
    this.elementCell = document.createElement("div");
    this.element = document.createElement("div");
    this.element.textContent = letter;

    this.elementCell.classList.add(
      "crossword-grid-cell",
      "crossword-letter-cell"
    );
    this.element.classList.add("crossword-letter");

    this.elementCell.appendChild(this.element);
    crosswordGrid.appendChild(this.elementCell);

    this.setFontSize();

    window.addEventListener("resize", this.setFontSize.bind(this));
  }

  setFontSize() {
    const fontSize = this.elementCell.offsetWidth * 0.04;
    this.element.style.fontSize = `${fontSize}rem`;
  }
}
