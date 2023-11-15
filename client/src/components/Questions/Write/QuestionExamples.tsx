import { useSelector } from 'react-redux';
import {
  addExample,
  deleteExample,
  selectExamples,
  updateExample
} from '../../../features/questions/creatorSlice';
import { store } from '../../../store';
import { PlusIcon, XCircleIcon } from '@heroicons/react/24/solid';

const QuestionExamples = () => {
  const examples = useSelector(selectExamples);

  const handleDelete = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    store.dispatch(deleteExample({ example: examples[index], index: index }));
  };

  const handleChangeIn = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    store.dispatch(
      updateExample({
        example: {
          ...examples[index],
          in: e.target.value
        },
        index: index
      })
    );
  };

  const handleChangeOut = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    store.dispatch(
      updateExample({
        example: {
          ...examples[index],
          out: e.target.value
        },
        index: index
      })
    );
  };

  const handleChangeExplanation = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    store.dispatch(
      updateExample({
        example: {
          ...examples[index],
          explanation: e.target.value
        },
        index: index
      })
    );
  };

  const handleAddExample = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    store.dispatch(
      addExample({
        in: '',
        out: '',
        explanation: ''
      })
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-semibold">Examples</h3>
      <div className="flex flex-col gap-4">
        {examples.map((example, index) => (
          <div
            key={index}
            className="relative border border-[0.5] bg-white p-4 rounded-xl"
          >
            <XCircleIcon
              className="absolute top-2 right-2 w-5 h-5 text-red-500 hover:cursor-pointer"
              onClick={(e) => handleDelete(e, index)}
            />
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <div className="flex flex-col w-1/2 gap-2">
                  <h4 className="font-semibold">In</h4>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                    placeholder="In"
                    value={example.in}
                    onChange={(e) => handleChangeIn(e, index)}
                  />
                </div>
                <div className="flex flex-col w-1/2 gap-2">
                  <h4 className="font-semibold">Out</h4>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                    placeholder="Out"
                    value={example.out}
                    onChange={(e) => handleChangeOut(e, index)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="font-semibold">Explanation</h4>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  placeholder="Explanation"
                  value={example.explanation}
                  onChange={(e) => handleChangeExplanation(e, index)}
                />
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={(e) => handleAddExample(e)}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl"
        >
          <PlusIcon className="h-5 w-5 inline-block" />
        </button>
      </div>
    </div>
  );
};

export default QuestionExamples;
