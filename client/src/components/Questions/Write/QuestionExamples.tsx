import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  addExample,
  deleteExample,
  selectExamples
} from '../../../features/questions/creatorSlice';
import { store } from '../../../store';

import { QuestionExample as QuestionExampleType } from '../../../types';
import QuestionExample from './QuestionExample';

const QuestionExamples = () => {
  const examples = useSelector(selectExamples);

  const onAdd = useCallback(() => {
    store.dispatch(addExample({ in: '', out: '', explanation: '' }));
  }, [store, examples]);

  const onDelete = useCallback(
    (example: QuestionExampleType) => {
      store.dispatch(deleteExample(example));
    },
    [store, examples]
  );

  return (
    <>
      {examples.map((example, index) => (
        <div key={index} className="relative">
          <QuestionExample index={index} example={example} />
          <button
            onClick={() => onDelete(example)}
            className="absolute -top-2 -right-2 p-1 rounded-full shadow-md bg-gray-700"
          >
            <MinusIcon className="w-4 h-4 text-rose-500" />
          </button>
        </div>
      ))}

      <button
        onClick={onAdd}
        className="ml-4 w-10 bg-gray-800 rounded-full p-2 shadow-xl transition hover:scale-105"
      >
        <PlusIcon className="w-6 h-6 text-gray-100" />
      </button>
    </>
  );
};

export default QuestionExamples;
