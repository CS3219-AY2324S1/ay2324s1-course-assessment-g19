import { useSelector } from 'react-redux';
import {
  addConstraint,
  deleteConstraint,
  selectConstraints,
  updateConstraint
} from '../../../features/questions/creatorSlice';
import { PlusIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { store } from '../../../store';

const QuestionConstraints = () => {
  const constraints = useSelector(selectConstraints);

  const handleDelete = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    store.dispatch(
      deleteConstraint({ constraint: constraints[index], index: index })
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    store.dispatch(
      updateConstraint({ constraint: e.target.value, index: index })
    );
  };

  const handleAddConstraint = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    store.dispatch(addConstraint(''));
  };

  return (
    <div
      className="flex flex-col
        gap-2"
    >
      <h3 className="font-semibold">Constraints</h3>
      {constraints.map((constraint, index) => (
        <div
          key={index}
          className="relative border border-[0.5] bg-white p-4 rounded-xl"
        >
          <XCircleIcon
            className="absolute top-2 right-2 w-5 h-5 text-red-500 hover:cursor-pointer"
            onClick={(e) => handleDelete(e, index)}
          />
          <input
            key={index}
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter constraint"
            value={constraint}
            onChange={(e) => handleChange(e, index)}
          />
        </div>
      ))}
      <button
        onClick={(e) => handleAddConstraint(e)}
        className="bg-blue-500 text-white px-4 py-2 rounded-xl"
      >
        <PlusIcon className="h-5 w-5 inline-block" />
      </button>
    </div>
  );
};

export default QuestionConstraints;
