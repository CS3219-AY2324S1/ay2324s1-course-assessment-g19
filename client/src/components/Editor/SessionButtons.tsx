import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';
import { useCallback, useEffect } from 'react';
import { setIsActive } from '../../features/play/playSlice';
import { store } from '../../store';
import { resetGame, selectGameId } from '../../features/play/gameSlice';
import { useSelector } from 'react-redux';
import { socket } from '../../socket';

const SessionButtons = () => {
  const gameId = useSelector(selectGameId);

  const onNext = useCallback(() => {
    alert('to implement');
  }, []);

  const onLeave = useCallback(() => {
    socket.emit('leave_game', gameId);
  }, []);

  useEffect(() => {
    socket.on('confirm_leave_game', () => {
      store.dispatch(setIsActive(false));
      store.dispatch(resetGame());
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
        onClick={onLeave}
        className="flex flex-row gap-2 items-center text-gray-100 text-sm px-4 py-2 bg-rose-800 rounded-lg transition opacity-70 hover:opacity-80"
      >
        <a>Leave</a>
      </button>
    </div>
  );
};

export default SessionButtons;
