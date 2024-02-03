import { validaCamposEValores } from "./validaCamposEValores.service.js";

export function juros({
  valor,
  qtdParcelas,
  taxa,
  retornos = ["valorParcelas"],
}) {
  const obj = { valido: false, dados: {}, message: "" };
  const verificaCampos = validaCamposEValores({ valor, qtdParcelas, taxa });
  if (verificaCampos.length > 0) {
    obj.message = `Os parametros: ${verificaCampos} devem ser numéricos!`;
    return obj;
  }

  let [montante, taxaPercentual, valorParcelas] = [+valor, +taxa / 100];

  for (let parcela = 1; parcela <= +qtdParcelas; parcela++) {
    montante = montante * taxaPercentual + montante;
  }

  montante = Number(montante).toFixed(2);
  valorParcelas = Number(montante / +qtdParcelas).toFixed(2);

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
