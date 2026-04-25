import { Router } from "express";
import { getWeatherByCity } from "../services/weatherServices";

const router = Router();

router.get("/", async (req, res) => {
  const city = req.query.city as string;

  if (!city || city.trim() === "") {
    return res.status(400).json({ error: "Cidade não informada" });
  }

  try {
    const data = await getWeatherByCity(city);
    return res.json(data);

  } catch (error: any) {
    console.log("ERRO REAL:", error.response?.data || error.message);

    if (error.response?.status === 404) {
      return res.status(404).json({ error: "Cidade não encontrada" });
    }

    if (error.response?.status === 401) {
      return res.status(401).json({ error: "API Key inválida" });
    }

    return res.status(500).json({ error: "Erro interno ao buscar clima" });
  }
});

export default router;