import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import swaggerUi from 'swagger-ui-express';

import { swaggerSpec } from './swagger';

import auth from '@/routes/auth.routes';
import projects from '@/routes/projects.routes';

const app = express();

const allowedOrigins = process.env.CORS_ORIGIN?.split(',') ?? [];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
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
