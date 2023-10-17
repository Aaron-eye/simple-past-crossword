import millisToMinutesAndSeconds from "../utils/millisToMinutesAndSeconds.js";

const playTimeContainer = document.querySelector(".play-time");
const wordAttemptsContainer = document.querySelector(".word-attempts");
const crosswordContainer = document.querySelector(".crossword-container");

export default class GameView {
  updateTimer(newTime) {
    playTimeContainer.textContent = millisToMinutesAndSeconds(newTime);
  }

  updateWordAttempts(newAttempts) {
    wordAttemptsContainer.textContent = newAttempts;
  }

  showWinMessage() {
    const winMessageElement = document.createElement("h2");
    winMessageElement.classList.add("win-message");
    winMessageElement.textContent = "You won!";
    crosswordContainer.insertAdjacentElement("afterbegin", winMessageElement);
  }
}
