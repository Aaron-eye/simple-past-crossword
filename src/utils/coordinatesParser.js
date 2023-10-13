const convertToArray = function (coordinates) {
  return coordinates.split(",").map((coord) => +coord);
};

const convertToString = function (coordinates) {
  return `${coordinates[0]},${coordinates[1]}`;
};

export { convertToArray, convertToString };
