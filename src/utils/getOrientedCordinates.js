import * as coordinatesParser from "../utils/coordinatesParser.js";

export default (coordinates, orientation, length, parseToString = true) => {
  let [x, y] = coordinatesParser.convertToArray(coordinates);
  if (orientation == "horizontal") x += length;
  else y += length;

  return parseToString ? coordinatesParser.convertToString([x, y]) : [x, y];
};
