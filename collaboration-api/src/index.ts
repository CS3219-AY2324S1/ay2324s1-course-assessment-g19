import express, { Express, Request, Response } from 'express';
import axios from 'axios';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { executeCode } from './code.controller';
import { fetchPlayers, fetchQuestion } from './connect.controller';

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

  socket.on('join_game', async (data) => {
    const { gameId, difficulty, playerOneEmail, playerTwoEmail, currentUser } =
      data;

    console.log(`User ${socket.id} joined game ${gameId}`);

    const question = await fetchQuestion(difficulty);
    const { playerOne, playerTwo } = await fetchPlayers(
      playerOneEmail,
      playerTwoEmail
    );

    socket.join(gameId);
    socket.emit('confirm_game', gameId, question, playerOne, playerTwo);

    const time = new Date(Date.now());

    io.to(gameId).emit('chat_message_recv', {
      id: `game-${gameId}-system-${time.toLocaleString()}`,
      sender: 'SYSTEM',
      message: `User ${currentUser.name} has joined the session!`,
      timestamp: time,
      gameId: gameId
    });
  });

  socket.on('leave_game', (gameId) => {
    console.log(`User ${socket.id} left game ${gameId}`);

    socket.leave(gameId);
    socket.emit('confirm_leave_game');
  });

  socket.on('message_send', (data) => {
    io.to(data.gameId).emit('message_recv', data.message);
  });

  socket.on('language_send', (data) => {
    io.to(data.gameId).emit('language_recv', data.language);
  });

  socket.on('execute_send', async (data) => {
    io.to(data.gameId).emit('execute_start');
    console.log('Executing code...');

    const response = await executeCode(data.sourceCode, data.languageId);
    console.log('Execute code complete');

    io.to(data.gameId).emit('execute_recv', response);
  });

  socket.on('chat_message_send', (data) => {
    console.log(data.message);

    io.to(data.gameId).emit('chat_message_recv', data);
  });

  socket.on('disconnect', () => {
    const rooms = Object.keys(socket.rooms);

    // Leave each room
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
