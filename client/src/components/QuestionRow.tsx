import { Question } from '../types';

interface QuestionRowProps {
	question: Question;
}

const QuestionRow: React.FC<QuestionRowProps> = ({ question }) => {
	return (
		<tr key={question.id}>
			<td className="py-2 px-3 border-b text-center">{question.id}</td>
			<td className="py-2 px-3 border-b text-center">{question.title}</td>
			<td className="py-2 px-3 border-b text-center">{question.description}</td>
			<td className="py-2 px-3 border-b text-center">{question.category}</td>
			<td className="py-2 px-3 border-b text-center">{question.complexity}</td>
		</tr>
	);
};

export default QuestionRow;
