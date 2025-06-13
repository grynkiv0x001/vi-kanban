import express from 'express';

import project from './routes/project.routes'

const app = express();

app.use(express.json());

app.get('/', (_, res) => {
  res.send('vi-kanban API\n');
});

app.use('/project', project)

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
