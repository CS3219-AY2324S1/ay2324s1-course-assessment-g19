import { useSelector } from 'react-redux';
import {
  selectTitle,
  updateTitle
} from '../../../features/questions/creatorSlice';
import { store } from '../../../store';
import { useCallback } from 'react';

const QuestionTitle = () => {
  const title = useSelector(selectTitle);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    store.dispatch(updateTitle(e.target.value));
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-semibold">Title</h3>
      <input
        type="text"
        className="border border-gray-300 rounded-md p-2"
        placeholder="Title"
        value={title}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default QuestionTitle;
