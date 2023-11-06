import express, { Express } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { executeCode } from './code.controller';
import { fetchPlayers, fetchQuestion } from './connect.controller';
import Redis from 'ioredis';

require('dotenv').config();

const app: Express = express();
const port = process.env.SERVER_PORT;
const connectionString = process.env.REDIS_URI;

app.use(cors());

const server = createServer(app);

const redis = new Redis(connectionString!);

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
    const {
      gameId,
      difficulty,
      language,
      playerOneEmail,
      playerTwoEmail,
      currentUser
    } = data;

    console.log(`User ${socket.id} joined game ${gameId}`);

    const question = await fetchQuestion(difficulty);
    const { playerOne, playerTwo } = await fetchPlayers(
      playerOneEmail,
      playerTwoEmail
    );

    let roomData;

    const roomDataString = await redis.get(gameId);

    if (!roomDataString) {
      roomData = {
        gameId,
        question,
        language,
        messages: [],
        playerOne,
        playerTwo
      };
    } else {
      roomData = JSON.parse(roomDataString);
    }

    const time = new Date(Date.now());
    roomData.messages.push({
      id: `game-${gameId}-system-${time.toLocaleString()}`,
      sender: 'SYSTEM',
      message: `User ${currentUser.name} has joined the session!`,
      timestamp: time,
      gameId: gameId
    });

    await redis.set(gameId, JSON.stringify(roomData));

    socket.join(gameId);
    socket.emit('update', roomData);
  });

  socket.on('check_game', async (data) => {
    console.log(`User ${socket.id} checked game ${data.gameId}`);

    const roomDataString = await redis.get(data.gameId);

    if (!roomDataString) {
      console.log(`No room data found for game ${data.gameId}`);
      socket.emit('game_not_found');
      return;
    }

    const roomData = JSON.parse(roomDataString);
    socket.join(data.gameId);
    socket.emit('update', roomData);
  });

  socket.on('leave_game', async (data) => {
    console.log(`User ${data.currentUser} left game ${data.gameId}`);
    const roomDataString = await redis.get(data.gameId);

    if (!roomDataString) {
      console.log(`No room data found for game ${data.gameId}`);
      return;
    }

    const roomData = JSON.parse(roomDataString);

    if (
      roomData.playerOne &&
      data.currentUser.email === roomData.playerOne.email
    ) {
      roomData.playerOne = undefined;
    } else if (
      roomData.playerTwo &&
      data.currentUser.email === roomData.playerTwo.email
    ) {
      roomData.playerTwo = undefined;
    }

    const time = new Date(Date.now());
    roomData.messages.push({
      id: `game-${data.gameId}-system-${time.toLocaleString()}`,
      sender: 'SYSTEM',
      message: `${data.currentUser.name} has left the session!`,
      timestamp: time,
      gameId: data.gameId
    });

    if (!roomData.playerOne && !roomData.playerTwo) {
      await redis.del(data.gameId);
    } else {
      await redis.set(data.gameId, JSON.stringify(roomData));
    }

    socket.leave(data.gameId);
    socket.emit('confirm_leave_game');
    io.to(data.gameId).emit('update', roomData);
  });

  socket.on('message_send', async (data) => {
    const roomDataString = await redis.get(data.gameId);

    if (!roomDataString) {
      console.log(`No room data found for game ${data.gameId}`);
      return;
    }

    const roomData = JSON.parse(roomDataString);

    roomData.data = data.message;
    await redis.set(data.gameId, JSON.stringify(roomData));

    io.to(data.gameId).emit('update', roomData);
  });

  socket.on('language_send', async (data) => {
    console.log(
      `User ${socket.id} sent language ${data.language} to game ${data.gameId}`
    );

    const roomDataString = await redis.get(data.gameId);

    if (!roomDataString) {
      console.log(`No room data found for game ${data.gameId}`);
      return;
    }

    const roomData = JSON.parse(roomDataString);

    roomData.language = data.language;
    await redis.set(data.gameId, JSON.stringify(roomData));

    io.to(data.gameId).emit('update', roomData);
  });

  socket.on('execute_send', async (data) => {
    io.to(data.gameId).emit('execute_start');
    console.log('Executing code...');

    const output = await executeCode(data.sourceCode, data.languageId);
    console.log('Execute code complete');

    const roomDataString = await redis.get(data.gameId);

    if (!roomDataString) {
      console.log(`No room data found for game ${data.gameId}`);
      return;
    }

    const roomData = JSON.parse(roomDataString);

    roomData.output = output;
    await redis.set(data.gameId, JSON.stringify(roomData));

    io.to(data.gameId).emit('execute_end');
    io.to(data.gameId).emit('update', roomData);
  });

  socket.on('chat_message_send', async (data) => {
    console.log(`User ${socket.id} said ${data.message}`);

    const roomDataString = await redis.get(data.gameId);

    if (!roomDataString) {
      console.log(`No room data found for game ${data.gameId}`);
      return;
    }

    const roomData = JSON.parse(roomDataString);

    if (!roomData.messages) {
      roomData.messages = [];
    }

    roomData.messages.push(data);
    await redis.set(data.gameId, JSON.stringify(roomData));

    io.to(data.gameId).emit('update', roomData);
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
