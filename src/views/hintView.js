const wordHintsContainer = document.querySelector(".word-hints");

export default class HintView {
  render(hintString) {
    const hintElement = document.createElement("li");
    hintElement.classList.add("word-hint");
    hintElement.textContent = hintString;
    wordHintsContainer.appendChild(hintElement);

    this.hintElement = hintElement;
  }

  highlight() {
    this.hintElement.classList.add("highlighted");
  }

  stopHighlighting() {
    this.hintElement.classList.remove("highlighted");
  }
}
