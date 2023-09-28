import { useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  selectDescription,
  updateDescription
} from '../../../features/questions/creatorSlice';
import { store } from '../../../store';
import SectionHeader from './SectionHeader';

const QuestionDescription = () => {
  const description = useSelector(selectDescription);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }

      store.dispatch(updateDescription(e.target.value));
    },
    [store, textareaRef, textareaRef.current?.value]
  );

  return (
    <>
      <div className="flex flex-col bg-gray-200 gap-4 p-8 rounded-2xl shadow-lg">
        <SectionHeader title="Description" />

        <textarea
          ref={textareaRef}
          rows={1}
          value={description}
          onChange={(e) => handleChange(e)}
          className="resize-none min-h-[80px] p-2 border rounded-xl overflow-hidden bg-gray-100 shadow-inner"
        />
      </div>
    </>
  );
};

export default QuestionDescription;
