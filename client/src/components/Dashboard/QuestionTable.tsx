import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { setCurrentQuestion } from '../../features/play/playSlice';
import { selectQuestions } from '../../features/questions/questionsSlice';
import { store } from '../../store';
import { Question } from '../../types';
import { toCamelCase } from '../../utils/string';

const QuestionTable = () => {
  const questions = useSelector(selectQuestions);

  const handleClick = useCallback(
    (question: Question) => {
      store.dispatch(setCurrentQuestion(question));
    },
    [store]
  );

  return (
    <div className="flex flex-col flex-grow gap-4">
      <div className="flex flex-row text-neutral-500 bg-gray-200 rounded-2xl px-4 shadow-lg">
        <div className="p-4 w-28">Status</div>
        <div className="flex flex-grow p-4">Title</div>
        <div className="p-4 w-28">Solution</div>
        <div className="p-4 w-32">Acceptance</div>
        <div className="p-4 w-28">Difficulty</div>
        <div className="p-4 w-28">Frequency</div>
      </div>
      <div className="border rounded-2xl">
        {questions.map((question: Question, index: number) => (
          <div
            key={question.title}
            onClick={() => handleClick(question)}
            className={`flex flex-row px-2 transition cursor-pointer hover:shadow-inner ${
              index !== 0 && 'border-t'
            }
            ${index === 0 && 'rounded-t-2xl'}
            ${index === questions.length - 1 && 'rounded-b-2xl'}`}
          >
            <div className="p-4 w-28">TODO</div>
            <div className="flex flex-grow p-4 whitespace-nowrap">
              {index + 1}. {question.title}
            </div>
            <div className="p-4 w-28">TODO</div>
            <div className="p-4 w-32">TODO</div>
            <div className="p-4 w-28">{toCamelCase(question.difficulty)}</div>
            <div className="p-4 w-28">TODO</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionTable;