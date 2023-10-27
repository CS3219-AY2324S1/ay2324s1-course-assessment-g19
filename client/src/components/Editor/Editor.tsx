import { useCallback, useEffect, useState } from 'react';
import PlayerCard from './PlayerCard';
import { socket } from '../../socket';
import { store } from '../../store';
import {
  selectGameData,
  selectGameId,
  selectGameOpponent,
  setGameData,
  setGameId,
  setGamePlayers,
  setGameQuestion
} from '../../features/play/gameSlice';
import { useSelector } from 'react-redux';
import { ChatMessage, QuestionDifficulty, User } from '../../types';
import { setIsActive } from '../../features/play/playSlice';
import { selectCurrentUser } from '../../features/user/authSlice';
import { reset as resetChat } from '../../features/play/chatSlice';

const Editor = () => {
  const currentUser = useSelector(selectCurrentUser);
  const gameId = useSelector(selectGameId);
  const data = useSelector(selectGameData);
  const opponentPlayer = useSelector(selectGameOpponent);

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const message = event.target.value;

      socket.emit('message_send', { message, gameId });
    },
    [socket, gameId]
  );

  useEffect(() => {
    socket.on(
      'confirm_game',
      (
        id: string,
        question: QuestionDifficulty,
        playerOne: User,
        playerTwo: User
      ) => {
        store.dispatch(setIsActive(true));
        store.dispatch(setGameId(id));
        store.dispatch(setGameQuestion(question));
        store.dispatch(setGamePlayers([playerOne, playerTwo]));
        store.dispatch(resetChat());

        const time = new Date(Date.now());
        socket.emit('chat_message_send', {
          id: `game-${gameId}-system-${time.toLocaleString()}`,
          sender: 'SYSTEM',
          message: `User ${currentUser?.name} has joined the session!`,
          timestamp: time,
          gameId: gameId
        });
      }
    );

    socket.on('message_recv', (msg: string) => {
      store.dispatch(setGameData(msg));
    });
  }, [currentUser, socket, store]);

  return (
    <div className="flex flex-col py-8 pl-8 w-full h-full">
      <PlayerCard player={opponentPlayer} />

      <div className="border-4 border-dashed border-gray-800 flex flex-col flex-grow justify-center items-center rounded-lg my-4 gap-4">
        {gameId && (
          <>
            <div className="flex flex-row bg-gray-800 w-full h-full gap-4">
              <textarea
                placeholder="Message"
                className="flex m-4 rounded-lg bg-transparent text-white text-sm px-4 py-2 w-full flex-grow overflow-auto resize-none"
                onChange={onChange}
                value={data}
              />
            </div>
          </>
        )}
      </div>
      <PlayerCard self />
    </div>
  );
};

export default Editor;
