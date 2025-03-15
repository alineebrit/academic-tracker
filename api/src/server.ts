import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import atividadeRoutes from './routes/atividades.routes';
import userRoutes from './routes/user.routes';
import turmaRoutes from './routes/turma.routes';
import noteRoutes from './routes/note.routes';
import grupoRoutes from './routes/grupo.routes';
import { swaggerUi, swaggerDocs } from './config/swagger';
import authRoutes from './routes/auth.routes';

config();
const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
    res.send('hello world');
});

app.use('/atividades', atividadeRoutes);
app.use('/user', userRoutes);
app.use('/turma', turmaRoutes);
app.use('/notes', noteRoutes);
app.use('/grupo', grupoRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
});

export default app;
