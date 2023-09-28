import { MinusIcon } from '@heroicons/react/24/solid';

interface QuestionTagProps {
  tag: string;
  onDelete: (tag: string) => void;
}

const QuestionTag: React.FC<QuestionTagProps> = ({ tag, onDelete }) => {
  return (
    <div className="relative text-sm font-semibold text-rose-500 min-h-[36px] rounded-xl px-4 py-2 bg-gray-100 shadow-md">
      {tag}
      <button
        onClick={() => onDelete(tag)}
        className="absolute -top-2 -right-2 p-1 rounded-full shadow-md"
      >
        <MinusIcon className="w-3 h-3 text-rose-500" />
      </button>
    </div>
  );
};

export default QuestionTag;
