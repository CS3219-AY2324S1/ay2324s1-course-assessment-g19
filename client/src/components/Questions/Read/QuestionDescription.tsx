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
      <div className="flex flex-col bg-gray-200 gap-4 p-8 rounded-2xl shadow-lg">
        <SectionHeader title="Description" />

        <p className="px-4">{description}</p>
      </div>
    </>
  );
};

export default QuestionDescription;
