import { useSelector } from 'react-redux';
import {
  selectDifficulty,
  updateDifficulty
} from '../../../features/questions/creatorSlice';
import { QuestionDifficulty as QuestionDifficultyType } from '../../../types';
import { store } from '../../../store';

const QuestionDifficulty = () => {
  const difficulty = useSelector(selectDifficulty);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    store.dispatch(updateDifficulty(e.target.value as QuestionDifficultyType));
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-semibold">Difficulty</h3>
      <select
        className="border-transparent border-r-8 rounded-md p-2 outline outline-1 outline-gray-300"
        placeholder="Difficulty"
        value={difficulty}
        onChange={handleChange}
      >
        <option value="EASY">Easy</option>
        <option value="MEDIUM">Medium</option>
        <option value="HARD">Hard</option>
      </select>
    </div>
  );
};

export default QuestionDifficulty;
