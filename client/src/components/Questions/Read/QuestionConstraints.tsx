import { useSelector } from 'react-redux';
import { selectConstraints } from '../../../features/questions/creatorSlice';

const QuestionConstraints = () => {
  const constraints = useSelector(selectConstraints);

  return (
    <div
      className="flex flex-col
        gap-2"
    >
      <h3 className="font-semibold">Constraints</h3>
      <ul className="list-disc list-inside text-gray-700">
        {constraints.map((constraint, index) => (
          <li key={index}>{constraint}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionConstraints;
