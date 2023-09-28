import { LifebuoyIcon, StarIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  selectDifficulty,
  selectTitle,
  updateDifficulty,
  updateTitle
} from '../../../features/questions/creatorSlice';
import { store } from '../../../store';
import { QuestionDifficulty } from '../../../types';

const QuestionHeader = () => {
  const title = useSelector(selectTitle);
  const difficulty = useSelector(selectDifficulty);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      store.dispatch(updateTitle(e.target.value));
    },
    [store]
  );

  const handleSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      store.dispatch(updateDifficulty(e.target.value as QuestionDifficulty));
    },
    [store]
  );

  return (
    <div className="flex flex-col gap-4 bg-gray-200 p-8 rounded-2xl shadow-lg">
      <h1 className="flex flex-row justify-between items-center text-2xl text-neutral-800 font-semibold">
        <input
          className="w-full mr-4 p-2 rounded-xl bg-transparent shadow-inner"
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleChange}
        />
        <div className="flex gap-2"></div>
        <button className="flex">
          <LifebuoyIcon className="w-6 h-6 text-gray-500" />
        </button>
      </h1>

      <div className="flex flex-row justify-between">
        <div className="flex gap-8">
          <select
            className="rounded-2xl p-2 bg-gray-200 shadow-inner"
            value={difficulty}
            onChange={handleSelect}
          >
            <option value={'EASY'}>Easy</option>
            <option value={'MEDIUM'}>Medium</option>
            <option value={'HARD'}>Hard</option>
          </select>
          <div className="flex flex-row items-center gap-2">
            <StarIcon className="w-4 h-4 text-gray-500" />
            <StarIcon className="w-4 h-4 text-gray-500" />
            <StarIcon className="w-4 h-4 text-gray-500" />
            <StarIcon className="w-4 h-4 text-gray-500" />
            <StarIcon className="w-4 h-4 text-gray-500" />
          </div>
        </div>
        <button>
          <HeartIcon className="w-6 h-6 text-rose-600 text-opacity-50" />
        </button>
      </div>
    </div>
  );
};

export default QuestionHeader;
