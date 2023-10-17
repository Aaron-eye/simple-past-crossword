const gridContainer = document.querySelector(".grid-container");
const crosswordGrid = document.querySelector(".crossword-grid");

export default class TableView {
  maxCellSize = 32;
  constructor() {}

  render(tableModel) {
    const [tableWidth, tableHeight] = tableModel.size;
    crosswordGrid.style.gridTemplateColumns = ` repeat(${tableWidth}, 1fr)`;

    this.adjustGridContainer(tableModel.size);
  }

  addEmptySquare() {
    const emptySquare = document.createElement("div");
    emptySquare.classList.add("crossword-grid-cell");
    crosswordGrid.appendChild(emptySquare);
  }

  adjustGridContainer(tableSize) {
    const gridWidth = gridContainer.offsetWidth;
    const cellSize = gridWidth / tableSize[0];

    if (cellSize > this.maxCellSize) {
      console.log(tableSize[0] * this.maxCellSize);
      gridContainer.style.width = `${tableSize[0] * this.maxCellSize}px`;
    }
  }
}
