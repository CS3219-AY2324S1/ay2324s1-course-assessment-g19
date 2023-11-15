import { QuestionExample as QuestionExampleType } from '../../../types';
import QuestionExample from './QuestionExample';

interface QuestionExampleProps {
  examples?: QuestionExampleType[];
}

const QuestionExamples: React.FC<QuestionExampleProps> = ({ examples }) => {
  return (
    <>
      {examples?.map((example, index) => (
        <QuestionExample
          key={index}
          index={index + 1}
          input={example.in}
          output={example.out}
          explanation={example.explanation}
        />
      ))}
    </>
  );
};

export default QuestionExamples;
