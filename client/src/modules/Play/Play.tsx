import { useSelector } from 'react-redux';
import PlayBox from '../../components/Dashboard/PlayBox';
import QuestionTable from '../../components/Dashboard/QuestionTable';
import Editor from '../../components/Editor/Editor';
import Question from '../../components/Questions/Question';
import { selectCurrentQuestion } from '../../features/play/playSlice';

const Play = () => {
  const currentQuestion = useSelector(selectCurrentQuestion);

  return (
    <div className="flex flex-row h-screen">
      <Question question={currentQuestion} />
      <div className="flex flex-col p-4 gap-4">
        <PlayBox />
        <Editor />
        <QuestionTable />
      </div>
    </div>
  );
};

export default Play;
