import { useSelector } from 'react-redux';
import { selectExamples } from '../../../features/questions/creatorSlice';

const QuestionExamples = () => {
  const examples = useSelector(selectExamples);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-semibold">Examples</h3>
      <div className="flex flex-col gap-4">
        {examples.map((example, index) => (
          <div key={index}>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <div className="flex flex-col w-1/2 gap-2">
                  <h4 className="font-semibold">In</h4>
                  <p>{example.in}</p>
                </div>
                <div className="flex flex-col w-1/2 gap-2">
                  <h4 className="font-semibold">Out</h4>
                  <p>{example.out}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-semibold">Explanation</h4>
                <p>{example.explanation}</p>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionExamples;
