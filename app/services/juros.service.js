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

  montante = +(
    montante *
    (1 + (taxaMensal ? taxaPercentual : taxaEfetiva)) **
      (periodoMensal ? qtdParcelas : qtdParcelas * 12)
  ).toFixed(2);

  valorParcelas = +(montante / +qtdParcelas).toFixed(2);

  console.log({
    taxaEfetiva,
    taxaMensal,
    montante,
    valor,
    taxaPercentual,
    qtdParcelas: +qtdParcelas,
    valorParcelas,
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
