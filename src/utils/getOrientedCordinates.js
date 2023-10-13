import * as coordinatesParser from "../utils/coordinatesParser.js";

export default (coordinates, orientation, length) => {
  let [x, y] = coordinatesParser.convertToArray(coordinates);
  if (orientation == "horizontal") x += length;
  else y += length;

  return coordinatesParser.convertToString([x, y]);
};
