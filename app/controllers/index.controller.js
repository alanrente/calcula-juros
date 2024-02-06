import { juros } from "../services/juros.service.js";

export default function index(req, res) {
  const {
    valor,
    qtdParcelas,
    taxa,
    retornos,
    taxaMensal,
    periodoMensal,
    aporte,
  } = req.query;

  const resultado = juros({
    valor: +valor,
    qtdParcelas: +qtdParcelas,
    taxa: +taxa,
    taxaMensal: !!+taxaMensal,
    periodoMensal: !!+periodoMensal,
    aporte: +aporte,
    retornos: retornos ? retornos.split(",") : retornos,
  });

  if (!resultado.valido)
    return res.status(400).json({ message: resultado.message });

  res.json(resultado.dados);
}
