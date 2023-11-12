import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import Redis from 'ioredis';
import { fetchAiResponse } from '../controllers/assistant.controller';

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

    if (data.message.startsWith('?')) {
      io.to(data.gameId).emit('is_assistant_loading', true);

      const aiResponse = await fetchAiResponse(
        data.message.substring(data.message.indexOf('?'))
      );
      console.log(`Assistant sent chat message ${aiResponse}`);

      const time = new Date(Date.now());
      const aiMessage = {
        id: `game-${data.gameId}-assistant-${time.toLocaleString()}`,
        sender: { id: 'SATURDAY', name: 'Saturday' },
        message: aiResponse,
        timestamp: time,
        gameId: data.gameId
      };

      const roomDataString = await redis.get(data.gameId);

      if (!roomDataString) {
        console.log(`No room data found for game ${data.gameId}`);
        return;
      }

      const roomData = JSON.parse(roomDataString);

      roomData.messages.push(aiMessage);
      await redis.set(data.gameId, JSON.stringify(roomData));

      io.to(data.gameId).emit('update', roomData);
      io.to(data.gameId).emit('is_assistant_loading', false);
    }
  };

  socket.on('chat_message_send', sendChatMessage);
};
