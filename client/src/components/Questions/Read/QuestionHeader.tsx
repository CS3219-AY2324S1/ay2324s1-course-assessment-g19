import { LifebuoyIcon, StarIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';
import { QuestionDifficulty } from '../../../types';

interface QuestionHeaderProps {
  title?: string;
  difficulty?: QuestionDifficulty;
}

const QuestionHeader: React.FC<QuestionHeaderProps> = ({
  title,
  difficulty
}) => {
  return (
    <div className="flex flex-col gap-4 bg-gray-200 p-8 rounded-2xl shadow-lg">
      <h1 className="flex flex-row justify-between items-center text-2xl text-neutral-800 font-semibold">
        <div className="flex gap-2">
          <a>#.</a>
          <a>{title}</a>
        </div>
        <button className="flex ">
          <LifebuoyIcon className="w-6 h-6" />
        </button>
      </h1>

      <div className="flex flex-row justify-between">
        <div className="flex gap-8">
          <a className="font-semibold text-yellow-500">{difficulty}</a>
          <div className="flex flex-row items-center gap-2">
            <StarIcon className="w-4 h-4" />
            <StarIcon className="w-4 h-4" />
            <StarIcon className="w-4 h-4" />
            <StarIcon className="w-4 h-4" />
            <StarIcon className="w-4 h-4" />
          </div>
        </div>
        <button>
          <HeartIcon className="w-6 h-6 text-rose-600" />
        </button>
      </div>
    </div>
  );
};

export default QuestionHeader;
