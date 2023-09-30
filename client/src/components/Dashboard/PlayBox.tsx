import {
  ChevronDownIcon,
  ClockIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const PlayBox = () => {
  return (
    <div className="flex flex-row justify-between items-center border px-8 py-4 rounded-xl gap-4">
      <div className="flex gap-4">
        <img
          onClick={() => alert('to implement')}
          className="h-12 w-12 rounded-full border-2 border-gray-500 cursor-pointer"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="Your avatar"
        />
        <a className="h-12 w-12 rounded-full border-2 border-rose-500" />
      </div>

      <div className="flex flex-row gap-2">
        <div className="flex justify-between items-center text-sm px-4 py-2 border border-gray-500 rounded-lg w-48 cursor-pointer transition hover:bg-gray-200 hover:shadow-inner">
          Language
          <ChevronDownIcon className="h-4 w-4 inline-block" />
        </div>
        <div className="flex justify-between items-center text-sm px-4 py-2 border border-gray-500 rounded-lg w-48 cursor-pointer transition hover:bg-gray-200 hover:shadow-inner">
          Difficulty
          <ChevronDownIcon className="h-4 w-4 inline-block" />
        </div>
        <div className="flex justify-between items-center text-sm px-4 py-2 border border-gray-500 rounded-lg w-48 cursor-pointer transition hover:bg-gray-200 hover:shadow-inner">
          Concepts
          <ChevronDownIcon className="h-4 w-4 inline-block" />
        </div>
      </div>

      <button>
        <ClockIcon className="h-6 w-6" />
      </button>

      <button>
        <CogIcon className="h-6 w-6" />
      </button>

      <button className="text-white rounded-xl px-4 py-2 bg-gray-800 shadow-md transition hover:shadow-lg hover:scale-105">
        Find Match!
      </button>
    </div>
  );
};

export default PlayBox;
