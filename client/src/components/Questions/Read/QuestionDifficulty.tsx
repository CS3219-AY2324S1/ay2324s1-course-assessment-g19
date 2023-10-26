import { useSelector } from 'react-redux';
import { selectDifficulty } from '../../../features/questions/creatorSlice';
import { toCamelCase } from '../../../utils/string';

const QuestionDifficulty = () => {
  const difficulty = useSelector(selectDifficulty);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-semibold">Difficulty</h3>
      <p>{toCamelCase(difficulty)}</p>
    </div>
  );
};

export default QuestionDifficulty;
