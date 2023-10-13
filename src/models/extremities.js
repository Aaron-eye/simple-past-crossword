import * as coordinatesParser from "../utils/coordinatesParser.js";

export default class Extremities {
  x = {
    min: 0,
    max: 0,
  };
  y = {
    min: 0,
    max: 0,
  };

  update(coordinates) {
    const [checkX, checkY] = coordinatesParser.convertToArray(coordinates);
    if (checkX < this.x.min) this.x.min = checkX;
    if (checkX > this.x.max) this.x.max = checkX;
    if (checkY < this.y.min) this.y.min = checkY;
    if (checkY > this.y.max) this.y.max = checkY;
  }
}
