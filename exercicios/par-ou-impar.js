console.log("TESTE JOGO!!");

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const numeroAleatorioEntreZeroECinco = getRndInteger(0, 5);

const jogo = (escolha, numero) => {
  const soma = Number(numero) + numeroAleatorioEntreZeroECinco;
  const par = soma % 2 === 0;
  const impar = soma % 2 !== 0;

  if (escolha === "par") {
    if (par) {
      return console.log(`Você escolheu par, o número ${numero} e o computador escolheu impar, o número ${numeroAleatorioEntreZeroECinco}.
      O resultado é: ${soma}. Você ganhou!`);
    } else if (impar) {
      return console.log(`Você escolheu par, o número ${numero} e o computador escolheu impar, o número ${numeroAleatorioEntreZeroECinco}.
      O resultado é: ${soma}. Você perdeu!`);
    }
  } else if (escolha === "impar") {
    if (par) {
      return console.log(`Você escolheu impar, o número ${numero} e o computador escolheu par, o número ${numeroAleatorioEntreZeroECinco}.
      O resultado é: ${soma}. Você perdeu!`);
    } else if (impar) {
      return console.log(`Você escolheu impar, o número ${numero} e o computador escolheu par, o número ${numeroAleatorioEntreZeroECinco}.
      O resultado é: ${soma}. Você ganhou!`);
    }
  }
};
jogo(process.argv[2], process.argv[3]);
