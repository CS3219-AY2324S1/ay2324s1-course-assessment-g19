import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';
import { useCallback } from 'react';
import { setIsActive } from '../../features/play/playSlice';
import { store } from '../../store';

const SessionButtons = () => {
  const onNext = useCallback(() => {
    alert('to implement');
  }, []);

  const onLeave = useCallback(() => {
    store.dispatch(setIsActive(false));
  }, []);

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
