import { juros } from "../services/juros.service.js";

export default function index(req, res) {
  const { valor, qtdParcelas, taxa, retornos } = req.query;

  const resultado = juros({
    valor,
    qtdParcelas,
    taxa,
    retornos: retornos ? retornos.split(",") : retornos,
  });

  if (!resultado.valido)
    return res.status(400).json({ message: resultado.message });

  res.json(resultado.dados);
}
