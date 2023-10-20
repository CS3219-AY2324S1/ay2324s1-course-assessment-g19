import express, { Express, Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

require('dotenv').config();

const app: Express = express();
const port = process.env.SERVER_PORT;

app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  path: '/',
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on('message_send', (message) => {
    socket.broadcast.emit('message_recv', message);
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`);
  });
});

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
