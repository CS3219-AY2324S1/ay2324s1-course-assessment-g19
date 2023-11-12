import { useSelector } from 'react-redux';
import QuestionConstraints from './Read/QuestionConstraints';
import QuestionDescription from './Read/QuestionDescription';
import QuestionExamples from './Read/QuestionExamples';
import QuestionFooter from './Read/QuestionFooter';
import QuestionHeader from './Read/QuestionHeader';
import QuestionTags from './Read/QuestionTags';
import { selectGameQuestions } from '../../features/play/gameSlice';
import Chat from '../Chat/Chat';

const Question = () => {
  const questions = useSelector(selectGameQuestions);
  const question = questions[questions.length - 1];

  if (!question) {
    return (
      <div className="flex flex-col p-8 gap-8">
        <div className="flex flex-col gap-4 items-center justify-center p-8 bg-gray-800 rounded-lg h-2/3 opacity-80 w-[448px] overflow-auto">
          <a className="text-white text-xl font-semibold">
            You've completed all the questions!
          </a>
        </div>

        <div className="h-1/3">
          <Chat />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-8 gap-8">
      <div className="flex flex-col gap-4 items-center p-8 bg-gray-800 rounded-lg h-2/3 opacity-80 w-[448px] overflow-auto">
        <QuestionHeader
          title={question?.title}
          difficulty={question?.difficulty}
        />
        {/* <QuestionTags tags={question?.tags} /> */}
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

      <div className="h-1/3">
        <Chat />
      </div>
    </div>
  );
};

export default Question;
