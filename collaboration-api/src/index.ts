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

  socket.on('join_game', async (gameId, difficulty) => {
    console.log(`User ${socket.id} joined game ${gameId}`);

    let question = null;

    try {
      const response = await axios.get(
        `http://peerprep-question-api:8000/questions/where?difficulty=${difficulty}`
      );

      question = response.data;
      console.log(`Caching question: ${question.title}`);
    } catch (error) {
      console.error(error);
    }
    // const question = {
    //   _id: '6536970330d1b3efef4b63de',
    //   title: 'The First Easy Question',
    //   difficulty: 'EASY',
    //   tags: ['Easy'],
    //   description:
    //     "This is such an easy question. Honestly I couldn't think of an easier question. Like seriously... how much easier can it get?",
    //   examples: [
    //     {
    //       in: '1 2 3 4 5',
    //       out: '5 4 3 2 1',
    //       explanation: 'This is the explanation for the first example',
    //       _id: '6536970330d1b3efef4b63df'
    //     },
    //     {
    //       in: '5 4 3 2 1',
    //       out: '1 2 3 4 5',
    //       explanation: 'This is the explanation for the second example',
    //       _id: '6536970330d1b3efef4b63df'
    //     }
    //   ],
    //   constraints: ['Easy constraint 1'],
    //   createdAt: Date.now(),
    //   updatedAt: Date.now()
    // };

    socket.join(gameId);
    socket.emit('confirm_game', gameId, question);
  });

  socket.on('leave_game', (gameId) => {
    console.log(`User ${socket.id} left game ${gameId}`);
    socket.leave(gameId);
  });

  socket.on('message_send', (data) => {
    socket.to(data.gameId).emit('message_recv', data.message);
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`);
  });
});

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
