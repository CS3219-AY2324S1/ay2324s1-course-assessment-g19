import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { QuestionConstraint as QuestionConstraintType } from '../../../types';
import SectionHeader from './SectionHeader';

interface QuestionConstraintsProps {
  constraints?: QuestionConstraintType[];
}

const QuestionConstraints: React.FC<QuestionConstraintsProps> = ({
  constraints
}) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <SectionHeader title="Constraints" />

      <div className="flex flex-col gap-1 text-gray-100 text-sm">
        {constraints?.map((constraint, index) => (
          <div key={index} className="flex gap-4 items-center">
            <ArrowRightIcon className="w-4 h-4" />
            {constraint}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionConstraints;
