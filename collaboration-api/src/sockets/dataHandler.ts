import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import Redis from 'ioredis';

module.exports = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  redis: Redis
) => {
  const sendData = async (data: { data: string; gameId: string }) => {
    const roomDataString = await redis.get(data.gameId);

    if (!roomDataString) {
      console.log(`No room data found for game ${data.gameId}`);
      return;
    }

    const roomData = JSON.parse(roomDataString);

    roomData.data = data.data;
    await redis.set(data.gameId, JSON.stringify(roomData));

    io.to(data.gameId).emit('update', roomData);
  };

  socket.on('data_send', sendData);
};
