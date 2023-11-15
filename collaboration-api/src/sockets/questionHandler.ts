import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import Redis from 'ioredis';
import { fetchQuestion } from '../controllers/connect.controller';

module.exports = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  redis: Redis
) => {
  const sendQuestion = async (data: { gameId: string }) => {
    console.log(
      `User ${socket.id} requested for next question to game ${data.gameId}`
    );

    const roomDataString = await redis.get(data.gameId);

    if (!roomDataString) {
      console.log(`No room data found for game ${data.gameId}`);
      return;
    }

    const roomData = JSON.parse(roomDataString);

    const questionIds = roomData.questions.map((question: any) => question._id);
    const question = await fetchQuestion(roomData.difficulty, questionIds);

    roomData.questions.push(question);
    await redis.set(data.gameId, JSON.stringify(roomData));

    io.to(data.gameId).emit('update', roomData);
  };

  socket.on('question_send', sendQuestion);
};
