import { QuestionDescription as QuestionDescriptionType } from '../../../types';
import SectionHeader from './SectionHeader';

interface QuestionDescriptionProps {
  description?: QuestionDescriptionType;
}

const QuestionDescription: React.FC<QuestionDescriptionProps> = ({
  description
}) => {
  return (
    <>
      <div className="flex flex-col w-full gap-2">
        <SectionHeader title="Description" />

        <p className="text-sm text-gray-100">{description}</p>
      </div>
    </>
  );
};

export default QuestionDescription;
