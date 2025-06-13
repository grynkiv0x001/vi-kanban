import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('vi-kanban API\n');
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
