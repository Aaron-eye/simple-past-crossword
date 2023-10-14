const crosswordGrid = document.querySelector(".crossword-grid");

export default class TableView {
  constructor() {}

  render(tableModel) {
    const [tableWidth, tableHeight] = tableModel.size;
    crosswordGrid.style.gridTemplateColumns = `repeat(${tableWidth}, 1fr)`;
  }

  addEmptySquare() {
    const emptySquare = document.createElement("div");
    emptySquare.classList.add("crossword-grid-cell");
    crosswordGrid.appendChild(emptySquare);
  }
}
