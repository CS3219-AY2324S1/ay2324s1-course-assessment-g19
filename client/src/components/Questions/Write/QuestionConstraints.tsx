import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  addConstraint,
  deleteConstraint,
  selectConstraints,
  updateConstraint
} from '../../../features/questions/creatorSlice';
import { store } from '../../../store';
import { QuestionConstraint } from '../../../types';
import SectionHeader from './SectionHeader';

const QuestionConstraints = () => {
  const constraints = useSelector(selectConstraints);

  const onAdd = useCallback(() => {
    store.dispatch(addConstraint(''));
  }, [store, constraints]);

  const onRemove = useCallback(
    (constraint: QuestionConstraint) => {
      store.dispatch(deleteConstraint(constraint));
    },
    [store, constraints]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      store.dispatch(updateConstraint({ constraint: e.target.value, index }));
    },
    [store]
  );

  return (
    <div className="flex flex-col bg-gray-200 p-8 rounded-2xl shadow-lg gap-4">
      <SectionHeader title="Constraints" />

      {constraints.map((constraint, index) => (
        <div key={index} className="flex gap-4 items-center px-4">
          <ArrowRightIcon className="w-4 h-4" />
          <input
            type="text"
            value={constraint}
            onChange={(e) => handleChange(e, index)}
            className="rounded-lg shadow-inner bg-gray-100 w-full"
          />
          <button onClick={() => onRemove(constraint)} className="pl-3 flex">
            <div className="p-1 bg-gray-100 rounded-full shadow-lg hover:scale-105">
              <MinusIcon className="w-4 h-4 text-rose-500" />
            </div>
          </button>
        </div>
      ))}

      <button onClick={onAdd} className="pl-3 flex">
        <div className="p-1 bg-gray-100 rounded-full shadow-lg hover:scale-105">
          <PlusIcon className="w-4 h-4 text-sky-500" />
        </div>
      </button>
    </div>
  );
};

export default QuestionConstraints;
