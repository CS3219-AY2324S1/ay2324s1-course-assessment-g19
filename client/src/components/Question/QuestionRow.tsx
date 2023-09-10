import { useCallback } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { removeQuestion } from '../../features/questions/questionsSlice';
import { Question } from '../../types';

interface QuestionRowProps {
	index: number;
	question: Question;
}

const QuestionRow: React.FC<QuestionRowProps> = ({ index, question }) => {
	const dispatch = useDispatch();

	const onDelete = useCallback(() => {
		dispatch(removeQuestion(question));
	}, [dispatch, question]);

	return (
		<tr key={question.id}>
			<td className="py-2 px-3 border-b text-center">{index}</td>
			<td className="py-2 px-3 border-b text-center">{question.title}</td>
			<td className="py-2 px-3 border-b text-center">{question.description}</td>
			<td className="py-2 px-3 border-b text-center">{question.category}</td>
			<td className="py-2 px-3 border-b text-center">{question.complexity}</td>
			<td className="py-2 border-b">
				<button
					onClick={onDelete}
					className="
						flex
						justify-center
						items-center
						p-2
						cursor-pointer 
						rounded-full
						transition 
						hover:shadow-inner
						hover:text-rose-500"
				>
					<IoMdClose size={18} />
				</button>
			</td>
		</tr>
	);
};

export default QuestionRow;
