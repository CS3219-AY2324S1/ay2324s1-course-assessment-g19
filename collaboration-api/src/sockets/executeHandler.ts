import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import Redis from 'ioredis';
import { executeCode } from '../controllers/code.controller';

module.exports = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  redis: Redis
) => {
  const sendExecute = async (data: {
    sourceCode: string;
    languageId: number;
    gameId: string;
  }) => {
    io.to(data.gameId).emit('execute_start');
    console.log(`User ${socket.id} executing code...`);

    const output = await executeCode(data.sourceCode, data.languageId);
    console.log(`User ${socket.id} execute code complete`);

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
  };

  socket.on('execute_send', sendExecute);
};
