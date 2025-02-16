import express from "express";
import { config } from "dotenv";
import cors from "cors";
import atividadeRoutes from "./routes/atividades.routes";
import userRoutes from "./routes/user.routes";
import turmaRoutes from "./routes/turma.routes";

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
app.use("/user", userRoutes);
app.use("/turma", turmaRoutes);
//grupo "/turma/:id/grupo"
//notes
export default app;
