import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import Redis from 'ioredis';

module.exports = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  redis: Redis
) => {
  const sendChatMessage = async (data: {
    id: string;
    sender: any;
    message: string;
    timestamp: Date;
    gameId: string;
  }) => {
    console.log(`User ${socket.id} sent chat message ${data.message}`);

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
  };

  socket.on('chat_message_send', sendChatMessage);
};
