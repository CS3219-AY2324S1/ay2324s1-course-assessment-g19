import { useSelector } from 'react-redux';
import { selectCurrentQuestion } from '../../features/play/playSlice';
import QuestionConstraints from './Read/QuestionConstraints';
import QuestionDescription from './Read/QuestionDescription';
import QuestionExamples from './Read/QuestionExamples';
import QuestionFooter from './Read/QuestionFooter';
import QuestionHeader from './Read/QuestionHeader';
import QuestionTags from './Read/QuestionTags';
import { selectGameQuestion } from '../../features/play/gameSlice';

const Question = () => {
  const question = useSelector(selectGameQuestion);

  return (
    <div className="flex flex-col p-8">
      <div className="flex flex-col gap-4 items-center p-8 bg-gray-800 rounded-lg h-full opacity-80 w-[448px] overflow-auto">
        <QuestionHeader
          title={question?.title}
          difficulty={question?.difficulty}
        />
        <QuestionTags tags={question?.tags} />
        <hr className="w-full my-2" />
        <QuestionDescription description={question?.description} />
        <hr className="w-full my-2" />
        <QuestionExamples examples={question?.examples} />
        <hr className="w-full my-2" />
        <QuestionConstraints constraints={question?.constraints} />
        <hr className="w-full my-2" />
        <a className="flex flex-grow" />
        <QuestionFooter />
      </div>
    </div>
  );
};

export default Question;
