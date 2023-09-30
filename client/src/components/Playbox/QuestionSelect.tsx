import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectQuestions } from '../../features/questions/questionsSlice';

const QuestionSelect = () => {
  const questions = useSelector(selectQuestions);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center">
      {isOpen && (
        <div className="overflow-auto">
          <a className="text-white">TO IMPLEMENT</a>
          {questions.map((question, index) => (
            <div className="w-64 whitespace-nowrap overflow-auto">
              <a className="text-sm text-gray-100">{question.title}</a>
            </div>
          ))}
        </div>
      )}

      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-row p-4 gap-2 items-center text-gray-100 transition hover:text-white cursor-pointer"
      >
        <a className="text-xs">Custom Question</a>
        {isOpen ? (
          <ChevronUpIcon className="h-3 w-3 inline-block" />
        ) : (
          <ChevronDownIcon className="h-3 w-3 inline-block" />
        )}
      </div>
    </div>
  );
};

export default QuestionSelect;
