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
            className="absolute -top-2 -right-2 p-1 rounded-full shadow-md bg-gray-100"
          >
            <MinusIcon className="w-4 h-4 text-rose-500" />
          </button>
        </div>
      ))}

      <button
        onClick={onAdd}
        className="flex justify-center bg-gray-100 p-4 my-4 mx-16 rounded-full shadow-lg transition hover:bg-gray-200 hover:opacity-75"
      >
        <PlusIcon className="w-6 h-6 text-sky-500" />
      </button>
    </>
  );
};

export default QuestionExamples;
