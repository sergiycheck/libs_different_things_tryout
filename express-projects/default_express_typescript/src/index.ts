import express from 'express';
import http from 'http';
import cors from 'cors';
import { randomUUID } from 'crypto';

const app: express.Application = express();

app.use(express.json());
app.use(cors());

const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(3020, () => {
  console.log('listening on *:3020');
});
