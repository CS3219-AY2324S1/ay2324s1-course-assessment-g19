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
    isPrompt?: boolean;
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

    if (data.message.startsWith('?')) {
      roomData.messages.push({
        ...data,
        message: data.message.substring(data.message.indexOf('?') + 1).trim(),
        isPrompt: true
      });
    } else {
      roomData.messages.push(data);
    }

    await redis.set(data.gameId, JSON.stringify(roomData));

    io.to(data.gameId).emit('update', roomData);

    if (data.message.startsWith('?')) {
      const roomDataString = await redis.get(data.gameId);

      if (!roomDataString) {
        console.log(`No room data found for game ${data.gameId}`);
        return;
      }

      const roomData = JSON.parse(roomDataString);

      roomData.isAssistantLoading = true;
      await redis.set(data.gameId, JSON.stringify(roomData));

      io.to(data.gameId).emit('update', roomData);

      const aiResponse = await fetchAiResponse(
        data.message.substring(data.message.indexOf('?') + 1).trim(),
        roomData.messages,
        roomData.questions[roomData.questions.length - 1],
        roomData.data,
        data.sender
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

      roomData.messages.push(aiMessage);
      roomData.isAssistantLoading = false;
      await redis.set(data.gameId, JSON.stringify(roomData));

      io.to(data.gameId).emit('update', roomData);
    }
  };

  socket.on('chat_message_send', sendChatMessage);
};
