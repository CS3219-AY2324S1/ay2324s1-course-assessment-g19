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
      </h1>

      <div className="flex flex-row justify-between">
        <div className="flex gap-4 items-center">
          <a className="font-semibold text-sm text-yellow-500">
            {toCamelCase(difficulty)}
          </a>
        </div>
      </div>
    </div>
  );
};

export default QuestionHeader;
