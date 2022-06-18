import express from 'express';
import http from 'http';
import cors from 'cors';
import { randomUUID } from 'crypto';
import ExpressRedisCache from 'express-redis-cache';

const port = 3020;
const app: express.Application = express();

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const cache = ExpressRedisCache({
  expire: 10, // optional: expire every 10 seconds
});

app.use(express.json());
app.use(cors());
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

function greet(req, res) {
  const between1and3seconds = 1000 + Math.floor(Math.random() * Math.floor(2000));
  wait(between1and3seconds).then(() => res.send(`Hello, I just waited ${between1and3seconds} ms`));
}

app.get('/greet', cache.route(), greet);

server.listen(port, () => {
  console.log('listening on *:' + port);
});
