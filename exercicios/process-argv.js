console.log(" TESTE - process.argv iniciado!!");

const meuArgumento1 = process.argv[2];
const meuArgumento2 = process.argv[3];

console.log("Imprime:", meuArgumento1, meuArgumento2);

// importante ou estar na pasta no qual tem o arq ou digitar o nome da
// C:\Users\WINDOWS\Desktop\labenu\MODULO III\NODE e PACKAGE.JSON\node-package-json-exercicios\exercicios> node process-argv.js meuArgumento1 meuArgumento2
// ou dar o nome da pasta depois de node: node exercicios/process-argv.js meuArgumento1 meuArgumento2
