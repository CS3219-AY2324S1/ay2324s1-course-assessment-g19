interface QuestionTagProps {
  tag: string;
}

const QuestionTag: React.FC<QuestionTagProps> = ({ tag }) => {
  return (
    <div className="text-sm font-semibold text-rose-500 rounded-xl px-4 py-2 bg-gray-100 shadow-md">
      {tag}
    </div>
  );
};

export default QuestionTag;
