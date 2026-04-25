import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import weatherRoutes from "./routes/weather";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("src/views"));

app.use("/api/weather", weatherRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});