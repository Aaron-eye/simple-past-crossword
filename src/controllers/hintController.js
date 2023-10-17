export default class HintController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  render() {
    this.view.render(this.model.hintString);
  }

  highlight() {
    this.view.highlight();
  }

  stopHighlighting() {
    this.view.stopHighlighting();
  }
}
