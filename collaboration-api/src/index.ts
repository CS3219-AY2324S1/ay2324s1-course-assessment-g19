import express, { Express, Request, Response } from 'express';
import axios from 'axios';
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

  socket.on(
    'join_game',
    async (gameId, difficulty, playerOneEmail, playerTwoEmail) => {
      console.log(`User ${socket.id} joined game ${gameId}`);

      let question = null;

      try {
        const questionResponse = await axios.get(
          `http://peerprep-question-api:8000/questions/where?difficulty=${difficulty}`
        );

        question = questionResponse.data;
        console.log(`Caching question: ${question.title}`);
      } catch (error) {
        console.error(error);
      }

      let playerOne = null;
      let playerTwo = null;

      try {
        const playerOneResponse = await axios.get(
          `http://peerprep-user-api:5050/user/?email=${playerOneEmail}`
        );
        const playerTwoResponse = await axios.get(
          `http://peerprep-user-api:5050/user/?email=${playerTwoEmail}`
        );

        playerOne = playerOneResponse.data;
        playerTwo = playerTwoResponse.data;
        console.log(`Caching players: ${playerOne.name} and ${playerTwo.name}`);
      } catch (error) {
        console.error(error);
      }

      socket.join(gameId);
      socket.emit('confirm_game', gameId, question, playerOne, playerTwo);
    }
  );

  socket.on('leave_game', (gameId) => {
    console.log(`User ${socket.id} left game ${gameId}`);
    socket.leave(gameId);
    socket.emit('confirm_leave_game');
  });

  socket.on('message_send', (data) => {
    io.to(data.gameId).emit('message_recv', data.message);
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
