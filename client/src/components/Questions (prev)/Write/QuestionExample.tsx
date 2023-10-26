import { useCallback, useRef } from 'react';
import { updateExample } from '../../../features/questions/creatorSlice';
import { store } from '../../../store';
import { QuestionExample as QuestionExampleType } from '../../../types';
import SectionHeader from './SectionHeader';

interface QuestionExampleProps {
  index: number;
  example: QuestionExampleType;
}

const QuestionExample: React.FC<QuestionExampleProps> = ({
  index,
  example
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const updatedExample = { ...example, in: e.target.value };

      store.dispatch(updateExample({ example: updatedExample, index }));
    },
    [store, example]
  );

  const handleChangeOutput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const updatedExample = { ...example, out: e.target.value };

      store.dispatch(updateExample({ example: updatedExample, index }));
    },
    [store, example]
  );

  const handleChangeExplanation = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }

      const updatedExample = { ...example, explanation: e.target.value };

      store.dispatch(updateExample({ example: updatedExample, index }));
    },
    [store, example, textareaRef, textareaRef.current?.value]
  );

  return (
    <div className="flex flex-col bg-gray-800 p-8 rounded-2xl shadow-lg">
      <SectionHeader title={`Example`} />

      <div className="flex flex-col pt-4 px-4 gap-2 text-gray-100">
        <div className="flex flex-row gap-4">
          <a className="min-w-[100px] w-[100px]">In: </a>
          <input
            type="text"
            value={example.in}
            onChange={(e) => handleChangeInput(e)}
            className="rounded-md border px-2 shadow-inner bg-gray-800 w-full outline-none"
          />
        </div>

        <div className="flex flex-row gap-4">
          <a className="min-w-[100px] w-[100px]">Out: </a>
          <input
            type="text"
            value={example.out}
            onChange={(e) => handleChangeOutput(e)}
            className="rounded-md border px-2 shadow-inner bg-gray-800 w-full outline-none"
          />
        </div>

        <div className="flex flex-row gap-4">
          <a className="min-w-[100px] w-[100px]">Explanation: </a>
          <textarea
            ref={textareaRef}
            rows={1}
            value={example.explanation}
            onChange={(e) => handleChangeExplanation(e)}
            className="resize-none min-h-[60px] p-2 border rounded-md overflow-hidden bg-gray-800 shadow-inner w-full outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionExample;
