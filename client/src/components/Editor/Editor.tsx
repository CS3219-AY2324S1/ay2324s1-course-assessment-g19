import { useEffect, useState } from 'react';
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
import { QuestionDifficulty, User } from '../../types';
import { setIsActive } from '../../features/play/playSlice';

const Editor = () => {
  const gameId = useSelector(selectGameId);
  const data = useSelector(selectGameData);
  const opponentPlayer = useSelector(selectGameOpponent);

  const [message, setMessage] = useState('');

  const onClick = () => {
    socket.emit('message_send', { message, gameId });
  };

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
      }
    );

    socket.on('message_recv', (msg: string) => {
      store.dispatch(setGameData(msg));
    });
  }, [socket, store]);

  return (
    <div className="flex flex-col py-8 pl-8 w-full h-full">
      <PlayerCard player={opponentPlayer} />

      <div className="border-4 border-dashed border-gray-800 flex flex-col flex-grow justify-center items-center rounded-lg my-4 gap-4">
        {gameId && (
          <>
            <a>{data}</a>
            <div className="flex flex-row gap-4">
              <input
                placeholder="Message"
                onChange={(e) => setMessage(e.target.value)}
                className="px-2"
              />
              <button
                onClick={onClick}
                className="py-2 px-4 rounded-md bg-gray-800 text-white"
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>

      <PlayerCard self />
    </div>
  );
};

export default Editor;
