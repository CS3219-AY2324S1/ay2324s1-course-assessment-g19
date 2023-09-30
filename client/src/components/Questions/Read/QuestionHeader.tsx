import { LifebuoyIcon, StarIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';
import { QuestionDifficulty } from '../../../types';
import { toCamelCase } from '../../../utils/string';

interface QuestionHeaderProps {
  title?: string;
  difficulty?: QuestionDifficulty;
}

const QuestionHeader: React.FC<QuestionHeaderProps> = ({
  title,
  difficulty
}) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="flex flex-row justify-between items-center text-2xl text-neutral-100 font-semibold">
        <div className="flex gap-2">
          <a>{title}</a>
        </div>
        <button className="flex ">
          <LifebuoyIcon className="w-5 h-5" />
        </button>
      </h1>

      <div className="flex flex-row justify-between">
        <div className="flex gap-4 items-center">
          <a className="font-semibold text-sm text-yellow-500">
            {toCamelCase(difficulty)}
          </a>
          <div className="flex flex-row items-center gap-2 text-gray-100">
            <StarIcon className="w-3 h-3" />
            <StarIcon className="w-3 h-3" />
            <StarIcon className="w-3 h-3" />
            <StarIcon className="w-3 h-3" />
            <StarIcon className="w-3 h-3" />
          </div>
        </div>
        <button>
          <HeartIcon className="w-5 h-5 text-rose-600" />
        </button>
      </div>
    </div>
  );
};

export default QuestionHeader;
