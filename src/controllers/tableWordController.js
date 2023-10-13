import getOrientedCoordinates from "../utils/getOrientedCordinates.js";
import TableLetterModel from "../models/tableLetterModel.js";
import TableLetterController from "./tableLetterController.js";

export default class TableWordController {
  constructor(model) {
    this.model = model;

    for (var i = 0; i < model.word.length; i++) {
      const letter = model.word[i];

      const tableLetterModel = new TableLetterModel(
        getOrientedCoordinates(model.coordinates, model.orientation, i),
        letter,
        this,
        model.table
      );
      const tableLetter = new TableLetterController(tableLetterModel);

      if (i == 0 || i == model.word.length - 1) tableLetter.isTip = true;

      this.letters.push(tableLetter);
    }
  }

  get letters() {
    return this.model.letters;
  }

  get coordinates() {
    return this.model.coordinates;
  }

  get orientation() {
    return this.model.orientation;
  }

  get word() {
    return this.model.word;
  }

  get inverseOrientation() {
    return this.model.inverseOrientation;
  }
}
