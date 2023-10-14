export default class TableLetterController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  render() {
    this.view.render(this.model.letter);
  }

  set isTip(newValue) {
    this.model.isTip = newValue;
  }

  get isTip() {
    return this.model.isTip;
  }

  get spaceOccupiedByTheSameLetter() {
    return this.model.spaceOccupiedByTheSameLetter;
  }

  get spaceOccupiedByOtherLetter() {
    return this.model.spaceOccupiedByOtherLetter;
  }

  get adjacentCoordinates() {
    return this.model.adjacentCoordinates;
  }

  get coordinates() {
    return this.model.coordinates;
  }

  get word() {
    return this.model.word;
  }

  get letter() {
    return this.model.letter;
  }
}
