import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import QuestionConstraints from '../../components/Questions/Read/QuestionConstraints';
import QuestionDescription from '../../components/Questions/Read/QuestionDescription';
import QuestionExamples from '../../components/Questions/Read/QuestionExamples';
import QuestionFooter from '../../components/Questions/Read/QuestionFooter';
import QuestionHeader from '../../components/Questions/Read/QuestionHeader';
import QuestionTags from '../../components/Questions/Read/QuestionTags';
import { selectQuestionByTitle } from '../../features/questions/questionsSlice';

const Question = () => {
  const { title } = useParams<{ title: string }>();
  const question = useSelector(selectQuestionByTitle(title));

  return (
    <div className="flex flex-row w-full h-screen overflow-hidden">
      <div className="flex flex-col w-full min-w-[512px] max-w-[1024px] p-4 gap-4 overflow-auto">
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
      <div className="flex flex-col w-full p-4 gap-4 overflow-auto">
        Text Editor
      </div>
    </div>
  );
};

export default Question;
