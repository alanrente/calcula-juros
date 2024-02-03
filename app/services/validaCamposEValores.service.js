export function validaCamposEValores(valores = {}) {
  return Object.keys(valores)
    .filter((campo) => !valores[campo] || isNaN(Number(valores[campo])))
    .map((cp) => cp);
}
