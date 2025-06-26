import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { curriculumRouter } from './routes/curriculumRoutes';
import path from 'path';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Servir frontend estático
app.use('/', express.static(path.join(__dirname, 'frontend')));

// API CRUD
app.use('/api/curriculums', curriculumRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
