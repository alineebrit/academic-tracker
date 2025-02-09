import express from "express";
import { config } from "dotenv";
import cors from "cors";
import atividadeRoutes from "./routes/atividades.routes";

config();
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("hello world");
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

app.use(cors());
app.use(express.json());

app.use("/atividades", atividadeRoutes);

export default app;
