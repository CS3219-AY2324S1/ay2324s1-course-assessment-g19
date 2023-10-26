import { useSelector } from 'react-redux';
import { selectTitle } from '../../../features/questions/creatorSlice';

const QuestionTitle = () => {
  const title = useSelector(selectTitle);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-semibold">Title</h3>
      <p>{title}</p>
    </div>
  );
};

export default QuestionTitle;
