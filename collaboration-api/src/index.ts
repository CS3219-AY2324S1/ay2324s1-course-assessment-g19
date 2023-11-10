import express, { Express } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import Redis from 'ioredis';

require('dotenv').config();

const app: Express = express();
const port = process.env.SERVER_PORT;
const connectionString = process.env.REDIS_URI;

const server = createServer(app);

const redis = new Redis(connectionString!);

const io = new Server(server, {
  path: '/',
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const registerGameHandler = require('./sockets/gameHandler');
const registerQuestionHandler = require('./sockets/questionHandler');
const registerDataHandler = require('./sockets/dataHandler');
const registerLanguageHandler = require('./sockets/languageHandler');
const registerExecuteHandler = require('./sockets/executeHandler');
const registerChatMessageHandler = require('./sockets/chatMessageHandler');

io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected`);

  registerGameHandler(io, socket, redis);
  registerQuestionHandler(io, socket, redis);
  registerDataHandler(io, socket, redis);
  registerLanguageHandler(io, socket, redis);
  registerExecuteHandler(io, socket, redis);
  registerChatMessageHandler(io, socket, redis);

  socket.on('disconnect', () => {
    const rooms = Object.keys(socket.rooms);

    rooms.forEach((room) => {
      if (room !== socket.id) {
        socket.leave(room);
        console.log(`User ${socket.id} left room ${room}`);
      }
    });

    console.log(`User ${socket.id} disconnected`);
  });
});

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
