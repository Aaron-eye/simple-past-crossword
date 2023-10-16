export default function (event) {
  const charCode = event.keyCode;
  return (
    (charCode > 64 && charCode < 91) ||
    (charCode > 96 && charCode < 123) ||
    charCode == 8
  );
}
