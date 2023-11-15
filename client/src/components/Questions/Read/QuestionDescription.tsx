import { useSelector } from 'react-redux';
import { selectDescription } from '../../../features/questions/creatorSlice';

const QuestionDescription = () => {
  const description = useSelector(selectDescription);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-semibold">Description</h3>
      <p className="whitespace-pre-wrap">{description}</p>
    </div>
  );
};

export default QuestionDescription;
