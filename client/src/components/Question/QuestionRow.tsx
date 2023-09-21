import { useCallback } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import {
	openQuestionDetailsModal,
	updateQuestionDetailsModal,
} from '../../features/modal/modalSlice';
import { Question } from '../../types';
import { store } from '../../store';
import { deleteQuestion } from '../../features/questions/questionsSlice';

interface QuestionRowProps {
	index: number;
	question: Question;
}

const QuestionRow: React.FC<QuestionRowProps> = ({ index, question }) => {
	const dispatch = useDispatch();

	const onOpen = useCallback(() => {
		dispatch(updateQuestionDetailsModal(question));
		dispatch(openQuestionDetailsModal());
	}, [dispatch, question]);

	const onDelete = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation();
			store.dispatch(deleteQuestion(question as Question));
		},
		[dispatch, question]
	);

	return (
		<tr
			key={question.id}
			onClick={onOpen}
			className="transition hover:opacity-70 cursor-pointer"
		>
			<td className="py-2 px-3 border-b text-center">{index}</td>
			<td className="py-2 px-3 border-b text-center">{question.title}</td>
			<td className="py-2 px-3 border-b text-center">{question.description}</td>
			<td className="py-2 px-3 border-b text-center">{question.category}</td>
			<td className="py-2 px-3 border-b text-center">{question.complexity}</td>
			<td className="py-2 border-b z-10">
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
