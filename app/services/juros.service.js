import { validaCamposEValores } from "./validaCamposEValores.service.js";

export function juros({
  valor,
  qtdParcelas,
  taxa,
  taxaMensal,
  periodoMensal,
  aporte,
  retornos = ["valorParcelas"],
}) {
  const obj = { valido: false, dados: {}, message: "" };
  const verificaCampos = validaCamposEValores({ valor, qtdParcelas, taxa });
  if (verificaCampos.length > 0) {
    obj.message = `Os parametros: ${verificaCampos} devem ser numéricos!`;
    return obj;
  }
  let montante = valor,
    taxaPercentual = +taxa / 100,
    valorParcelas,
    taxaEfetiva = (1 + taxaPercentual) ** (1 / 12) - 1;

  /*
     Fórmula dos juros compostos
    M = C * (1 + i)^t

    Onde:
    M = montante final
    C = capital
    i = taxa de juros
    t = tempo(a)
  */

  let taxaTeste = 0.12;
  for (let index = 0; index < 12; index++) {
    taxaTeste++;
  }

  console.log(taxaTeste);

  montante = +(
    montante *
    (1 + (taxaMensal ? taxaEfetiva : taxaPercentual)) **
      (periodoMensal ? qtdParcelas / 12 : qtdParcelas)
  ).toFixed(2);
  console.log({
    taxaEfetiva,
    taxaMensal,
    montante,
    valor,
    taxaPercentual,
    qtdParcelas: +qtdParcelas,
  });
  /*
  Como calcular com aportes mensais
  M = C * [(1 + i)^t – 1] / i

  Onde:
  M = montante final
  C = aporte mensal
  i = taxa de juros mensal
  t = tempo em meses
  */

  // for (let parcela = 1; parcela <= +qtdParcelas; parcela++) {
  //   // console.log({
  //   //   taxaMensal,
  //   //   periodoMensal,
  //   //   aporte,
  //   //   montantePRECalculo: montante,
  //   // });
  //   montante = montante * taxaPercentual + montante + (aporte ? aporte : 0);

  //   console.log({ montantePosCalculo: montante });
  // }

  // montante = Number(montante).toFixed(2);
  // valorParcelas = Number(montante / +qtdParcelas).toFixed(2);

  const arrayRetorno = [
    { valor, mostrar: retornos.includes("valor") },
    { qtdParcelas, mostrar: retornos.includes("qtdParcelas") },
    { taxa, mostrar: retornos.includes("taxa") },
    { montante, mostrar: retornos.includes("montante") },
    { taxaPercentual, mostrar: retornos.includes("taxaPercentual") },
    { valorParcelas, mostrar: retornos.includes("valorParcelas") },
  ]
    .filter((v) => v.mostrar)
    .map((v) => {
      delete v.mostrar;
      return v;
    });

  if (arrayRetorno.length == 0) {
    obj.message = `O parâmetro retornos só aceita os seguintes valores: valor, qtdParcelas, taxa, montante, taxaPercentual e valorParcelas.`;
    return obj;
  }

  obj.valido = true;

  arrayRetorno.forEach((v) => {
    obj.dados[Object.keys(v)[0]] = v[Object.keys(v)[0]];
  });

  return obj;
}
