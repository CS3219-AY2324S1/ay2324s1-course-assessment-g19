import SectionHeader from './SectionHeader';

interface QuestionExampleProps {
  index: number;
  input: string;
  output: string;
  explanation?: string;
}

const QuestionExample: React.FC<QuestionExampleProps> = ({
  index,
  input,
  output,
  explanation
}) => {
  return (
    <div className="flex flex-col w-full gap-2 text-gray-100">
      <SectionHeader title={`Example ${index}`} />

      <div className="flex flex-col gap-1 text-sm">
        <div className="flex flex-row gap-4">
          <a className="w-[100px] font-medium">In: </a>
          <p>{input}</p>
        </div>

        <div className="flex flex-row gap-4">
          <a className="w-[100px] font-medium">Out: </a>
          <p>{output}</p>
        </div>

        {explanation && (
          <div className="flex flex-col gap-1">
            <a className="w-[100px] font-medium">Explanation: </a>
            <p className="px-1">{explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionExample;
