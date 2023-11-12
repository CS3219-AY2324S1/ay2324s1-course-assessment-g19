import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { fetchPlayers, fetchQuestion } from '../controllers/connect.controller';
import Redis from 'ioredis';

module.exports = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  redis: Redis
) => {
  const joinGame = async (data: {
    gameId: string;
    difficulty: string;
    language: string;
    boilerplate: string;
    playerOneEmail: string;
    playerTwoEmail: string;
    currentUser: any;
  }) => {
    const {
      gameId,
      difficulty,
      language,
      boilerplate,
      playerOneEmail,
      playerTwoEmail,
      currentUser
    } = data;

    console.log(`User ${socket.id} joined game ${gameId}`);

    const question = await fetchQuestion(difficulty, []);
    const { playerOne, playerTwo } = await fetchPlayers(
      playerOneEmail,
      playerTwoEmail
    );

    let roomData;
    const roomDataString = await redis.get(gameId);

    if (!roomDataString) {
      roomData = {
        gameId,
        startedAt: new Date(Date.now()),
        difficulty,
        questions: [question],
        language,
        data: boilerplate,
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
  };

  const checkGame = async (data: { gameId: string }) => {
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
  };

  const leaveGame = async (data: { gameId: string; currentUser: any }) => {
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
  };

  socket.on('join_game', joinGame);
  socket.on('check_game', checkGame);
  socket.on('leave_game', leaveGame);
};
