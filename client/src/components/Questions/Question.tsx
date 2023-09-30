import { Question as QuestionType } from '../../types';
import QuestionConstraints from './Read/QuestionConstraints';
import QuestionDescription from './Read/QuestionDescription';
import QuestionExamples from './Read/QuestionExamples';
import QuestionFooter from './Read/QuestionFooter';
import QuestionHeader from './Read/QuestionHeader';
import QuestionTags from './Read/QuestionTags';

interface QuestionProps {
  question?: QuestionType;
}

const Question: React.FC<QuestionProps> = ({ question }) => {
  return (
    <div className="flex flex-col w-full min-w-[384px] max-w-[768px] p-4 gap-4 overflow-auto">
      <QuestionHeader
        title={question?.title}
        difficulty={question?.difficulty}
      />
      <QuestionTags tags={question?.tags} />
      <QuestionDescription description={question?.description} />
      <QuestionExamples examples={question?.examples} />
      <QuestionConstraints constraints={question?.constraints} />
      <QuestionFooter />
    </div>
  );
};

export default Question;
