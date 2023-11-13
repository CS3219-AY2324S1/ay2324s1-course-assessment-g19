import { ClockIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { selectGameStartedAt } from '../../features/play/gameSlice';
import { useEffect, useState } from 'react';

const Timer = () => {
  const startedAt = useSelector(selectGameStartedAt);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!startedAt) {
      return;
    }

    const interval = setInterval(() => {
      const now = new Date();
      const diffInSeconds = Math.floor(
        (now.getTime() - new Date(startedAt).getTime()) / 1000
      );
      setMinutes(Math.floor(diffInSeconds / 60));
      setSeconds(diffInSeconds % 60);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [startedAt]);

  return (
    <div className="flex flex-row gap-2 justify-between w-32 items-center text-gray-100 px-4 py-2 bg-gray-800 rounded-lg transition hover:opacity-80">
      <ClockIcon className="w-5 h-5" />
      <a>{`${minutes}:${seconds.toString().padStart(2, '0')}`}</a>
    </div>
  );
};

export default Timer;
