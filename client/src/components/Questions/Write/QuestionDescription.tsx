import { useSelector } from 'react-redux';
import {
  selectDescription,
  updateDescription
} from '../../../features/questions/creatorSlice';
import { store } from '../../../store';

const QuestionDescription = () => {
  const description = useSelector(selectDescription);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    store.dispatch(updateDescription(e.target.value));
  };
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-semibold">Description</h3>
      <textarea
        className="border border-gray-300 rounded-md p-2 whitespace-pre-wrap"
        placeholder="Description"
        value={description}
        onChange={handleChange}
      />
    </div>
  );
};

export default QuestionDescription;
