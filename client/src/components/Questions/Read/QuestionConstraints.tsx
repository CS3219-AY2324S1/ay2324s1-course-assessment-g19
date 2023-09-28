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
    <div className="flex flex-col bg-gray-200 p-8 rounded-2xl shadow-lg gap-4">
      <SectionHeader title="Constraints" />

      {constraints?.map((constraint, index) => (
        <div key={index} className="flex gap-4 items-center px-4">
          <ArrowRightIcon className="w-4 h-4" />
          {constraint}
        </div>
      ))}
    </div>
  );
};

export default QuestionConstraints;
