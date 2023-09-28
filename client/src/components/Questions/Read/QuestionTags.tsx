import { QuestionTag as QuestionTagType } from '../../../types';
import QuestionTag from './QuestionTag';

interface QuestionTagsProps {
  tags?: QuestionTagType[];
}

const QuestionTags: React.FC<QuestionTagsProps> = ({ tags }) => {
  return (
    <div className="flex flex-row flex-wrap gap-4 px-4 py-2">
      {tags?.map((tag, index) => <QuestionTag key={index} tag={tag} />)}
    </div>
  );
};

export default QuestionTags;
