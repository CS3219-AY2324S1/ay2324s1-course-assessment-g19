import { ClockIcon } from '@heroicons/react/24/outline';

const Timer = () => {
  return (
    <div className="flex flex-row gap-2 justify-between w-32 items-center text-gray-100 px-4 py-2 bg-gray-800 rounded-lg transition hover:opacity-80">
      <ClockIcon className="w-5 h-5" />
      <a>5:32</a>
    </div>
  );
};

export default Timer;
