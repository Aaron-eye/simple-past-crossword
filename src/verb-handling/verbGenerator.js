const fs = require("fs");
const csv = require("jquery-csv");

// Caminho para o arquivo CSV local
const filePath = "src/verbs.csv";

// Lê o conteúdo do arquivo CSV do sistema de arquivos local
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Erro ao ler o arquivo:", err);
    return;
  }

  // Parseia o conteúdo do arquivo CSV para objetos
  const parsedData = csv
    .toObjects(data)
    .map((obj) => {
      return obj["Simple Past"];
    })
    .filter((verb) => verb !== "");

  // Imprime os dados parseados no console
  console.log(parsedData);

  var parsedDataJson = JSON.stringify(parsedData);

  fs.writeFile("src/output.json", parsedDataJson, (err) => {
    if (err) {
      console.error("Erro ao salvar o arquivo JSON:", err);
      return;
    }
    console.log("Arquivo JSON salvo com sucesso!");
  });
});
