interface QuestionTagProps {
  tag: string;
}

const QuestionTag: React.FC<QuestionTagProps> = ({ tag }) => {
  return (
    <div className="text-xs font-semibold text-rose-500 rounded-md px-2 py-1 bg-gray-100 shadow-md w-full">
      {tag}
    </div>
  );
};

export default QuestionTag;
