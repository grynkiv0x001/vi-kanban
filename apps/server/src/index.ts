import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import swaggerUi from 'swagger-ui-express';

import { swaggerSpec } from './swagger';

import auth from '@/routes/auth.routes';
import projects from '@/routes/projects.routes';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

app.use(express.json());

app.get('/', (_, res) => {
  res.send('vi-kanban API\n');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cookieParser());

app.use('/auth', auth);
app.use('/projects', projects);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
