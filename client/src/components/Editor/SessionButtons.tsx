import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';
import { useCallback, useEffect } from 'react';
import { selectLanguage, setIsActive } from '../../features/play/playSlice';
import { store } from '../../store';
import {
  resetGame,
  selectGameData,
  selectGameId,
  selectGameIsRunning,
  setGameIsRunning,
  setGameOutput
} from '../../features/play/gameSlice';
import { useSelector } from 'react-redux';
import { socket } from '../../socket';
import { selectCurrentUser } from '../../features/user/authSlice';
import Cookies from 'js-cookie';

const SessionButtons = () => {
  const gameId = useSelector(selectGameId);
  const data = useSelector(selectGameData);
  const language = useSelector(selectLanguage);
  const isRunning = useSelector(selectGameIsRunning);
  const currentUser = useSelector(selectCurrentUser);

  const onNext = useCallback(() => {
    alert('to implement');
  }, []);

  const onExecute = useCallback(() => {
    if (!language) {
      return;
    }
    socket.emit('execute_send', {
      sourceCode: data,
      languageId: language.id,
      gameId
    });
  }, [data, language]);

  const onLeave = useCallback(() => {
    socket.emit('leave_game', { gameId, currentUser });
  }, [gameId]);

  useEffect(() => {
    socket.on('execute_start', () => {
      store.dispatch(setGameOutput(''));
      store.dispatch(setGameIsRunning(true));
    });
  }, [store]);

  useEffect(() => {
    socket.on('execute_end', () => {
      store.dispatch(setGameIsRunning(false));
    });
  }, [store]);

  useEffect(() => {
    socket.on('confirm_leave_game', () => {
      store.dispatch(setIsActive(false));
      store.dispatch(resetGame());

      Cookies.remove('gameId');
    });
  }, [socket, store]);

  return (
    <div className="flex flex-row gap-4">
      <button
        onClick={onNext}
        className="flex flex-row gap-2 items-center text-gray-100 text-sm px-4 py-2 bg-gray-800 rounded-lg transition hover:opacity-80"
      >
        <a>Next Question</a>
        <ArrowRightCircleIcon className="w-5 h-5" />
      </button>

      <button
        onClick={onExecute}
        disabled={isRunning}
        className={`flex flex-row gap-2 items-center w-28 text-gray-100 justify-center text-sm px-4 py-2 bg-sky-500 rounded-lg transition hover:opacity-80 ${
          isRunning && 'opacity-50'
        }`}
      >
        <a>{isRunning ? 'Executing...' : 'Execute'}</a>
      </button>

      <button
        onClick={onLeave}
        className="flex flex-row gap-2 items-center text-gray-100 text-sm px-4 py-2 bg-rose-800 rounded-lg transition opacity-70 hover:opacity-80"
      >
        <a>Leave</a>
      </button>
    </div>
  );
};

export default SessionButtons;
